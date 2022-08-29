import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import queryString from "query-string"
import InfoBar from "../info-bar"
import Input from "../input"
import "./index.css"
import Messages from "../messages"

let socket
const ENDPOINT = "https://dev-backend-chat-app.herokuapp.com/"
const Chat = ({}) => {
	const [name, setName] = useState("")
	const [room, setRoom] = useState("")
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const { name, room } = queryString.parse(window.location.search)
		socket = io(ENDPOINT)
		console.log(window.location.search)
		console.log(name)
		console.log(room)
		setName(name)
		setRoom(room)
		socket.emit("join", { name, room }, () => {})
		console.log(socket)
		return () => {
			socket.emit("disconnect")
			socket.off()
		}
	}, [ENDPOINT, window.location.search])

	useEffect(() => {
		socket.on("message", (mess) => {
			setMessages([...messages, mess])
		})
	}, [messages])

	console.log(message, messages)
	// function for sending messages

	const sendMessage = (e) => {
		e.preventDefault()
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""))
		}
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
				{/* <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        /> */}
			</div>
		</div>
	)
}

export default Chat
