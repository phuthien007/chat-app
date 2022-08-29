import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "../message"
import { css } from "@emotion/css"
import "./index.css"

const ROOT_CSS = css({
	height: 230,
	marginTop: 10,
	width: "100%",
	mode: "bottom",
})
const Messages = ({ messages, name }) => {
	return (
		<ScrollToBottom className={ROOT_CSS}>
			{messages &&
				messages.map((message, i) => (
					<div key={i}>
						<Message message={message} name={name} />
					</div>
				))}
		</ScrollToBottom>
	)
}

export default Messages
