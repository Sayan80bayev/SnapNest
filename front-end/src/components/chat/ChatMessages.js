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
    // console.log("handleScroll called");
    const messageBubble = lastMessageRef.current;
    let messageTosSent;
    try {
      const messageContent = messageBubble
        .querySelector(".message-bubble")
        .textContent.trim();
      // console.log("Message content:", messageContent);
    } catch (error) {}

    // console.log("lastMessageRef.current:", lastMessageRef.current);
    // console.log("chatWindowRef.current:", chatWindowRef.current);

    if (lastMessageRef.current && chatWindowRef.current) {
      const lastMessagePos = lastMessageRef.current.getBoundingClientRect();
      const chatWindowPos = chatWindowRef.current.getBoundingClientRect();

      // console.log("Last message position:", lastMessagePos);
      // console.log("Chat window position:", chatWindowPos);

      if (lastMessagePos.top <= chatWindowPos.bottom) {
        // console.log("Marking last message as read");
        const result = await markAsRead(messages[messages.length - 1]);
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
              content={message.content}
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
