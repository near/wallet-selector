import React from 'react';
import PropTypes from 'prop-types';

function Messages({ messages }: any) {
  return (
    <>
      <h2>Messages</h2>
      {messages.map((message: any, i: number) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}</strong>:<br/>
          {message.text}
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};

export default Messages;
