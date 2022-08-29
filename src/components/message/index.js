import React from "react"
import "./index.css"

const Message = ({ message: { user, text }, name }) => {
	let isSentByCurrentUser = false
	const trimmedName = name.trim().toLowerCase()
	console.log(user)
	console.log(name)
	if (user === trimmedName) {
		isSentByCurrentUser = true
	}
	console.log(isSentByCurrentUser)

	return (
		<>
			{isSentByCurrentUser ? (
				<div className="messageContainer justifyEnd">
					<p className="sentText pr-10">{trimmedName}</p>
					<div className="messageBox backgroundBlue">
						<p className="messageText colorWhite">{text}</p>
					</div>
				</div>
			) : (
				<div className="messageContainer justifyStart">
					{/* <p className="sentText">{trimmedName}</p> */}
					<div className="messageBox backgroundLight">
						<p className="messageText colorDark">{text}</p>
					</div>
					<p className="sentText pl-10">{user}</p>
				</div>
			)}
		</>
	)
}

export default Message
