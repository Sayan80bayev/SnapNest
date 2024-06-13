import React, { useState, useEffect } from "react";
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
  width: 60%;
  flex-grow: 1;
  text-overflow: ellipsis;
`;

const ChatPreview = styled.div`
  text-overflow: ellipsis;
  font-size: 14px;
  color: #666;
`;

const UnreadCount = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: var(--primary); /* Example unread indicator color */
  color: white;
  padding-top: 1px;
  font-size: 13px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  margin-left: 5px;
`;

const ChatSelector = ({ chatData, setRecipient }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatColors, setChatColors] = useState({});

  useEffect(() => {
    if (chatData) {
      const colors = {};
      chatData.forEach((chat, index) => {
        colors[chat.username] = getRandomColor();
      });
      setChatColors(colors);
    }
  }, [chatData]);

  const handleChatClick = (recipient) => {
    setActiveChat(recipient);
    setRecipient(recipient);
  };

  if (!chatData) return <p>Loading</p>;

  return (
    <ChatSelectorBar>
      {chatData.map((chat, index) => (
        <ChatItem
          key={index}
          active={activeChat === index}
          onClick={() => handleChatClick(chat.title)}
        >
          <Avatar
            bgColor={chatColors[chat.username]}
            style={{ width: "40px", height: "40px" }}
          >
            {chat.avatar ? (
              <img src={chat.avatar} alt={chat.title} />
            ) : (
              chat.username[0].toUpperCase()
            )}
          </Avatar>
          <ChatTitle>
            {chat.username}
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
