import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode"; // Импортируем правильно
import { ContextMenu } from "./ContextMenu"; // Если это ваш кастомный компонент
import { ChatContainer } from "./ChatContainer"; // Если это ваш кастомный компонент
import Message from "./Message"; // Если это ваш кастомный компонент

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
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (e) {
    console.error("Error decoding token:", e);
    return <>Invalid token</>;
  }

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
      console.log(messages[contextMenu.messageIndex]);
      onDeleteMessage(messages[contextMenu.messageIndex]);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };
  // console.log(messages);
  return (
    <ChatContainer>
      {messages &&
        messages.map((message, index) => {
          const isSender = message.sender === decodedToken.sub;
          if (message.deleted) {
            console.log("Skipping deleted message:", message);
            return null;
          }

          return (
            <Message
              key={index}
              isSender={isSender}
              onContextMenu={(event) => handleRightClick(event, index)}
              content={message.content}
            />
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
