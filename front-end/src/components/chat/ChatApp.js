import React, { useState, useEffect } from "react";
import "./style.css";
import ChatMessages from "./ChatMessages";
import ChatSelector from "./ChatSelector";
import UserInfo from "./UserInfo";
import WebSocketService from "../config/WebSocketService";
import axios from "axios";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("currentUser"); // Replace with actual user info
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    WebSocketService.connect((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      axios
        .get(`/api/messages/received/${selectedChat}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedChat]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = {
      sender,
      recipient: selectedChat,
      content,
      timestamp: new Date().toISOString(),
    };
    WebSocketService.sendMessage(message);
    setContent("");
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <main id="chat-main">
      <ChatSelector onSelectChat={handleChatSelect} />
      <div className="chat-window">
        <div>
          <ChatMessages messages={messages} />
        </div>
        <div>
          <form className="row form-message" onSubmit={handleSendMessage}>
            <textarea
              cols="30"
              rows="10"
              className="inputMessage"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary" id="send">
              <svg
                style={{ width: "20px" }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5003 12H5.41872M5.24634 12.9934L18.5032 18.9998C18.7605 19.1208 19.0587 19.1297 19.3246 19.0243C19.5906 18.9189 19.7962 18.7088 19.8896 18.45L21.8947 12.95C21.9647 12.7525 21.976 12.5385 21.9274 12.3333C21.8789 12.1281 21.7728 11.9406 21.6213 11.7934C21.4697 11.6463 21.2793 11.5453 21.0715 11.5034C20.8637 11.4614 20.6487 11.4806 20.4532 11.5598L6.99981 17.0198M5.24634 12.9934L6.99981 17.0198M5.24634 12.9934L6.99981 7.96698M6.99981 7.96698L20.4532 13.44C20.6487 13.5192 20.8637 13.5384 21.0715 13.4964C21.2793 13.4544 21.4697 13.3535 21.6213 13.2063C21.7728 13.0592 21.8789 12.8717 21.9274 12.6665C21.976 12.4613 21.9647 12.2473 21.8947 12.0498L19.8896 6.54975C19.7962 6.29097 19.5906 6.08086 19.3246 5.97548C19.0587 5.8701 18.7605 5.879 18.5032 6.00002L5.24634 12.0064V12.9934Z"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      {selectedChat && <UserInfo email={selectedChat} />}
    </main>
  );
}
