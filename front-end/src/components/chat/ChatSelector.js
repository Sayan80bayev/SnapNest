import React, { useState } from "react";
import styled from "styled-components";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
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
  background-color: var(--primary); /* Example unread indicator color */
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
`;

const ChatSelector = ({ chatData }) => {
  const [activeChat, setActiveChat] = useState(null);
  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };
  if (!chatData) return <p>Loading</p>;
  return (
    <ChatSelectorBar>
      {chatData.map((chat, index) => (
        <ChatItem
          key={index}
          active={activeChat === index}
          onClick={() => handleChatClick(index)}
        >
          <Avatar
            bgColor={getRandomColor()}
            style={{ width: "40px", height: "40px" }}
          >
            {chat.avatar ? (
              <img src={chat.avatar} alt={chat.title} />
            ) : (
              chat.title[0].toUpperCase()
            )}
          </Avatar>
          <ChatTitle>
            {chat.title}
            {chat.preview && <ChatPreview>{chat.preview}</ChatPreview>}
          </ChatTitle>
          {chat.unreadCount > 0 && (
            <UnreadCount>{chat.unreadCount}</UnreadCount>
          )}
        </ChatItem>
      ))}
    </ChatSelectorBar>
  );
};

export default ChatSelector;
