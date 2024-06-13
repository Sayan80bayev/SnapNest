import React from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode"; // Corrected import

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  overflow-y: auto; /* Make the chat scrollable */
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.isSender ? "flex-end" : "flex-start"}; /* Conditional alignment */

  .message-bubble {
    background-color: ${(props) =>
      props.isSender
        ? "var(--accent)"
        : "#f0f0f0"}; /* Conditional background color */
    color: ${(props) =>
      props.isSender ? "white" : "black"}; /* Conditional text color */
    margin-left: ${(props) => (props.isSender ? "10px" : "0")};
    margin-right: ${(props) => (props.isSender ? "0" : "10px")};
    padding: 8px 12px;
    border-radius: 15px;
    max-width: 70%; /* Limit bubble width for better readability */
  }
`;

const ChatMessages = ({ messages, recipient }) => {
  if (!messages) return <>Loading...</>;
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  return (
    <ChatContainer>
      {messages &&
        messages.map((message, index) => {
          const isSender = message.sender === decodedToken.sub;
          const isRelevantMessage =
            message.recipient === recipient || message.sender === recipient;
          if (!isRelevantMessage) return null;
          return (
            <Message key={index} isSender={isSender}>
              <div className="message-bubble">{message.content}</div>
            </Message>
          );
        })}
    </ChatContainer>
  );
};

export default ChatMessages;
