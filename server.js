const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser, getUser, getUserInRoom } = require("./users");
const PORT = process.env.PORT || 5000; // default port
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(router);

try {
  io.on("connection", (socket) => {
    console.log("We have a connection");

    socket.on("join", ({ name, room }, callback) => {
      console.log(name, room);
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return callback(error);
      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to the room ${user.room}`,
      });
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name}, has joined` });
      socket.join(user.room);
      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });

    // disconnect the socket
    socket.on("disconnect", () => {
      try {
        const user = removeUser(socket.id);
        if (user) {
          io.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has left`,
          });
        }
        console.log("User had left");
      } catch (error) {
        console.log(error);
      }
    });
  });
} catch (error) {
  console.log(error);
}

server.listen(PORT, () => console.log("listening on port " + PORT)); // listen on port PORT or port 5000
