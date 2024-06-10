import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ChatMessages from "./ChatMessages";
import ChatSelector from "./ChatSelector";
import UserInfo from "./UserInfo";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import WebSocketService from "../config/WebSocketService";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("sayan123serv@gmail.com"); // Replace with dynamic recipient if needed
  const [content, setContent] = useState("");
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchChats() {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/user/getChats?email=${
            jwtDecode(token).sub
          }`
        );
        setChatData(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchChats();
    setSender(jwtDecode(token).sub);

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [token]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:3001/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket server");
        setIsConnected(true);
        client.subscribe("/topic/messages", (message) => {
          if (message.body) {
            setMessages((prevMessages) => [...prevMessages, message.body]);
          }
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket server");
        setIsConnected(false);
      },
      debug: (str) => {
        console.log(str);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = {
      sender,
      recipient,
      content,
      timestamp: new Date().toISOString(),
    };
    async function send() {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/messages/send",
          message
        );
      } catch (error) {
        console.log(error);
      }
    }
    send();
    console.log(message);
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(message),
      });
    }
    setContent(""); // Clear the message input after sending
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    console.log(chat);
  };

  return (
    <main id="chat-main">
      <ChatSelector onClick={handleChatSelect} chatData={chatData} />
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
