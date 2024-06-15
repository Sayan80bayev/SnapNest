import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};

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

const ContextMenu = styled.ul`
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  li {
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

const ChatMessages = ({ messages, recipient, onDeleteMessage }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    messageIndex: null,
  });

  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  if (!messages) return <>Loading...</>;
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  const handleRightClick = (event, index) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      position: { x: event.clientX, y: event.clientY },
      messageIndex: index,
    });
  };

  const handleDeleteMessage = () => {
    if (contextMenu.messageIndex !== null) {
      // console.log(messages[contextMenu.messageIndex]);
      onDeleteMessage(messages[contextMenu.messageIndex]);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };
  return (
    <ChatContainer>
      {messages &&
        messages.map((message, index) => {
          const isSender = message.sender === decodedToken.sub;
          const isRelevantMessage =
            message.recipient === recipient || message.sender === recipient;
          if (!isRelevantMessage) return null;
          if (message.deleted) return null;
          return (
            <Message
              key={index}
              isSender={isSender}
              onContextMenu={(event) => handleRightClick(event, index)}
            >
              <div className="message-bubble">{message.content}</div>
            </Message>
          );
        })}
      {contextMenu.visible && (
        <ContextMenu ref={contextMenuRef} position={contextMenu.position}>
          <li onClick={handleDeleteMessage}>Delete Message</li>
        </ContextMenu>
      )}
    </ChatContainer>
  );
};

export default ChatMessages;
