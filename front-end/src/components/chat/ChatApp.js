import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ChatMessages from "./ChatMessages";
import ChatSelector from "./ChatSelector";
import UserInfo from "./UserInfo";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState(""); // Replace with dynamic recipient if needed
  const [inputMessage, setInputMessage] = useState("");
  const [chatData, setChatData] = useState([]);
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
        client.subscribe(`/queue/${jwtDecode(token).sub}`, (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
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
  }, [token]);

  const sendMessage = (event) => {
    event.preventDefault();
    const message = {
      sender: jwtDecode(token).sub,
      recipient: recipient,
      content: inputMessage,
    };
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage("");
    } else {
      console.error("Client is not connected");
    }
  };

  console.log(recipient);
  console.log(sender);
  console.log(messages);
  return (
    <main id="chat-main">
      <ChatSelector setRecipient={setRecipient} chatData={chatData} />
      <div className="chat-window">
        <div>
          <ChatMessages messages={messages} />
        </div>
        <div>
          <form className="row form-message" onSubmit={sendMessage}>
            <textarea
              cols="30"
              rows="10"
              className="inputMessage"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary" id="send">
              <svg
                style={{ width: "20px" }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </form>
        </div>
      </div>
      {recipient && <UserInfo email={recipient} />}
    </main>
  );
}
