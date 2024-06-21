import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { ContextMenu } from "./ContextMenu";
import { ChatContainer } from "./ChatContainer";
import Message from "./Message";

const ChatMessages = ({ messages, recipient, onDeleteMessage, markAsRead }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    messageIndex: null,
  });
  const [decodedToken, setDecodedToken] = useState();
  const contextMenuRef = useRef(null);
  const lastMessageRef = useRef(null);
  const chatWindowRef = useRef(null);

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
      console.error("Ошибка декодирования токена:", e);
      return;
    }
  }, []);

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

  const handleScroll = async () => {
    if (!chatWindowRef.current || !Array.isArray(messages)) return;

    const chatWindowPos = chatWindowRef.current.getBoundingClientRect();
    const visibleMessages = [];

    for (const [index, message] of messages.entries()) {
      const messageElement = document.getElementById(`message-${message.id}`);
      if (!messageElement) continue;

      const messagePos = messageElement.getBoundingClientRect();

      if (
        messagePos.top <= chatWindowPos.bottom &&
        !message.read.includes(decodedToken.sub)
      ) {
        visibleMessages.push(message);
      }
    }

    if (visibleMessages.length > 0) {
      try {
        await Promise.all(visibleMessages.map(markAsRead));
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    }
  };

  useEffect(() => {
    handleScroll();
  }, [messages]);

  return (
    <ChatContainer
      ref={chatWindowRef}
      onScroll={handleScroll}
      style={{ overflow: "auto" }}
    >
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
              id={message.id}
              content={message.content}
              read={message.read.length}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            />
          );
        })}
      {contextMenu.visible && (
        <ContextMenu ref={contextMenuRef} position={contextMenu.position}>
          <li onClick={handleDeleteMessage}>Удалить сообщение</li>
        </ContextMenu>
      )}
    </ChatContainer>
  );
};

export default ChatMessages;
