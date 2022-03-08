import React from "react";
import { Message } from "../interfaces";

interface MessagesProps {
  messages: Array<Message>;
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <>
      <h2>Messages</h2>
      {messages.map((message, i) => (
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? "is-premium" : ""}>
          <strong>{message.sender}</strong>:<br />
          {message.text}
        </p>
      ))}
    </>
  );
};

export default Messages;
