import React from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 500px; /* Adjust the height as needed */
  padding: 15px;
  overflow-y: auto; /* Make the chat scrollable */
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  &.user {
    justify-content: flex-end; /* Align user messages to the right */

    .message-bubble {
      background-color: #0084ff; /* User message background */
      color: white;
      margin-left: 10px;
    }
  }

  &.other {
    .message-bubble {
      background-color: #f0f0f0; /* Other user message background */
      margin-right: 10px;
    }
  }

  .message-bubble {
    padding: 8px 12px;
    border-radius: 15px;
    max-width: 70%; /* Limit bubble width for better readability */
  }
`;

const ChatMessages = () => {
  const messages = [
    { text: "Hello there!", user: "other" },
    { text: "Hi! How are you?", user: "user" },
    { text: "I'm doing well. What about you?", user: "other" },
    { text: "I'm great, thanks for asking!", user: "user" },
    // ... more messages
  ];

  return (
    <ChatContainer>
      {messages.map((message, index) => (
        <Message key={index} className={message.user}>
          <div className="message-bubble">{message.text}</div>
        </Message>
      ))}
    </ChatContainer>
  );
};

export default ChatMessages;
