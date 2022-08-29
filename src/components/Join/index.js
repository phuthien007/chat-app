import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            className="joinInput mt-20"
            placeholder="Room"
            onChange={(event) => setRoom(event.target.value)}
          />
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}`}
          >
            <button type="submit" className="button mt-20" on>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
