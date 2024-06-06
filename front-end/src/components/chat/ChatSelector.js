import React, { useState } from "react";
import styled from "styled-components";

const ChatSelectorBar = styled.div`
  width: 20%;
  background-color: #f8f8f8;
  padding: 15px;
  overflow-y: auto;
  height: 100vh; /* Occupy full viewport height */
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChatTitle = styled.div`
  flex-grow: 1;
`;

const ChatPreview = styled.div`
  font-size: 14px;
  color: #666;
`;

const UnreadCount = styled.div`
  background-color: #ff4500; /* Example unread indicator color */
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
`;

const ChatSelector = () => {
  const [activeChat, setActiveChat] = useState(null);

  const chatData = [
    {
      title: "Поднятие Уровня в О...",
      avatar: "path/to/avatar.jpg", // Replace with actual avatar image
      preview: "Graphite: Пипец",
      unreadCount: 10,
    },
    {
      title: "Нархоз | чат",
      avatar: "path/to/avatar2.jpg", // Replace with actual avatar image
      preview: null, // No preview message
      unreadCount: 457,
    },
    // ... more chat items
  ];

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <ChatSelectorBar>
      {chatData.map((chat, index) => (
        <ChatItem
          key={index}
          active={activeChat === index}
          onClick={() => handleChatClick(index)}
        >
          <Avatar src={chat.avatar} alt={chat.title} />
          <ChatTitle>{chat.title}</ChatTitle>
          {chat.preview && <ChatPreview>{chat.preview}</ChatPreview>}
          {chat.unreadCount > 0 && (
            <UnreadCount>{chat.unreadCount}</UnreadCount>
          )}
        </ChatItem>
      ))}
    </ChatSelectorBar>
  );
};

export default ChatSelector;
