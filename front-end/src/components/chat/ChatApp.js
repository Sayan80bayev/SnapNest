import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ChatMessages from "./ChatMessages";
import ChatSelector from "./ChatSelector";
import UserInfo from "./UserInfo";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  addMessage,
  findChatById,
  deleteMessage,
  readMessage,
} from "./helpers/helper";
import {
  sendMessageWS,
  deleteMessageWS,
  readMessageWS,
} from "./helpers/wsHelper";
import Skrepka from "./svg/Skrepka";
import Send from "./svg/Send";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const [inputMessage, setInputMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const clientRef = useRef(null);

  const token = localStorage.getItem("authToken");
  const email = jwtDecode(token).sub;

  useEffect(() => {
    async function fetchChats() {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/user/getChats?email=${email}`
        );
        setChatData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchChats();
    setSender(email);

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
        client.subscribe(`/queue/${email}`, (message) => {
          const body = JSON.parse(message.body);
          const { id, deleted } = body;
          console.log(id);
          if (deleted === true) {
            deleteMessage(body, setChatData);
          } else {
            console.log(chatData);
            const messageExists = chatData.some((chat) =>
              chat.messageList.some((m) => m.id === id)
            );
            console.log(messageExists);
            if (!messageExists) {
              addMessage(body, setChatData);
            } else {
              readMessage(id, email, setChatData);
            }
          }
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [token, chatData]);

  const sendMessage = (event) => {
    event.preventDefault();
    const message = {
      chat_id: currentChat,
      sender: sender,
      // recipient: "almaz@gmail.com",
      recipient: recipient,
      content: inputMessage,
      read: [
        {
          id: null,
          email: email,
          username: null,
          role: null,
        },
      ],
    };
    sendMessageWS(clientRef, message);
    setInputMessage("");
    console.log(message);
  };
  // Use a set to keep track of messages that have been marked as read
  const markedAsReadMessages = new Set();

  const markAsRead = (message) => {
    readMessageWS(clientRef, message, email, markedAsReadMessages);
  };

  const handleDeleteMessage = (message) => {
    console.log(message);
    deleteMessageWS(clientRef, message);
  };
  console.log(chatData);
  return (
    <main id="chat-main">
      <ChatSelector
        setRecipient={setRecipient}
        chatData={chatData}
        setCurrentChat={setCurrentChat}
      />
      <div className="chat-window">
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {chatData.map((c) => (
            <ChatMessages
              key={c.id}
              messages={findChatById(chatData, currentChat)?.messageList}
              recipient={recipient}
              onDeleteMessage={handleDeleteMessage}
              markAsRead={markAsRead}
            />
          ))}
        </div>
        <div>
          <form className="row form-message" onSubmit={sendMessage}>
            <Skrepka />
            <textarea
              cols="30"
              rows="10"
              className="inputMessage"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary" id="send">
              <Send />
            </button>
          </form>
        </div>
      </div>
      {recipient && <UserInfo email={recipient} />}
    </main>
  );
}
