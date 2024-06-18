import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import { ContextMenu } from "./ContextMenu"; // Assuming this is your custom component
import { ChatContainer } from "./ChatContainer"; // Assuming this is your custom component
import Message from "./Message"; // Assuming this is your custom component

const ChatMessages = ({ messages, recipient, onDeleteMessage, markAsRead }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    messageIndex: null,
  });
  const [decodedToken, setDecodedToken] = useState();
  const contextMenuRef = useRef(null);
  const lastMessageRef = useRef(null);
  const observer = useRef(null);

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    try {
      setDecodedToken(jwtDecode(token));
    } catch (e) {
      console.error("Error decoding token:", e);
      return;
    }

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markAsRead(messages[messages.length - 1]);
        }
      });
    };

    observer.current = new IntersectionObserver(callback, {
      root: null,
      threshold: 1.0,
    });

    if (lastMessageRef.current) {
      observer.current.observe(lastMessageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [messages, markAsRead]);

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
      onDeleteMessage(messages[contextMenu.messageIndex]);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  return (
    <ChatContainer>
      {messages &&
        messages.map((message, index) => {
          const isSender = message.sender === decodedToken?.sub;
          if (message.deleted) {
            return null;
          }

          return (
            <Message
              key={index}
              isSender={isSender}
              onContextMenu={(event) => handleRightClick(event, index)}
              content={message.content}
              ref={index === messages.length - 1 ? lastMessageRef : null}
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
