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
  const [recipient, setRecipient] = useState("");
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
    async function fetchMessages() {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/messages/received/${jwtDecode(token).sub}`
        );
        setMessages(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
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
          const body = JSON.parse(message.body);
          const { id, deleted } = body;
          if (deleted === true) {
            setMessages((prevMessages) =>
              prevMessages.filter((m) => m.id !== id)
            );
          } else {
            const messageExists = messages.some((m) => m.id === id);

            if (!messageExists) {
              setMessages((prevMessages) => [...prevMessages, body]);
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
  }, [token]);

  const sendMessage = (event) => {
    event.preventDefault();
    const message = {
      sender: jwtDecode(token).sub,
      // recipient: recipient,
      recipient: "almaz@gmail.com",
      content: inputMessage,
    };
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify(message),
      });
      setInputMessage("");
    } else {
      console.error("Client is not connected");
    }
  };
  const handleDeleteMessage = (message) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/delete",
        body: JSON.stringify(message),
      });

      setInputMessage("");
    } else {
      console.error("Client is not connected");
    }
  };
  return (
    <main id="chat-main">
      <ChatSelector setRecipient={setRecipient} chatData={chatData} />
      <div className="chat-window">
        <div style={{ overflow: "auto" }}>
          <ChatMessages
            messages={messages}
            recipient={recipient}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
        <div>
          <form className="row form-message" onSubmit={sendMessage}>
            <svg
              style={{ height: "30px", width: "max-content", padding: "0px" }}
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <style type="text/css">
                  {`
          .st0{fill:#651976;} 
        `}
                </style>
                <g>
                  <path
                    className="st0"
                    d="M454.821,253.582L273.256,435.14c-11.697,11.697-25.124,20.411-39.484,26.235 c-21.529,8.729-45.165,10.928-67.755,6.55c-22.597-4.378-44.054-15.25-61.597-32.784c-11.69-11.69-20.396-25.118-26.227-39.484 c-8.729-21.529-10.929-45.165-6.55-67.748c4.386-22.597,15.25-44.055,32.778-61.596l203.13-203.13 c7.141-7.134,15.299-12.43,24.035-15.969c13.1-5.318,27.516-6.656,41.263-3.994c13.769,2.677,26.798,9.27,37.498,19.963 c7.133,7.134,12.423,15.292,15.968,24.035c5.318,13.092,6.657,27.502,3.987,41.264c-2.67,13.762-9.262,26.783-19.955,37.498 L213.261,363.064c-2.534,2.528-5.375,4.364-8.436,5.61c-4.571,1.851-9.661,2.335-14.495,1.396 c-4.848-0.954-9.355-3.225-13.15-7.006c-2.534-2.534-4.364-5.368-5.603-8.429c-1.865-4.571-2.342-9.668-1.402-14.495 c0.947-4.841,3.225-9.355,7.005-13.149l175.521-175.528l-29.616-29.617l-175.528,175.52c-6.536,6.536-11.505,14.182-14.801,22.313 c-4.941,12.195-6.166,25.473-3.702,38.202c2.449,12.73,8.686,24.989,18.503,34.799c6.543,6.55,14.182,11.519,22.305,14.809 c12.202,4.948,25.473,6.165,38.21,3.702c12.722-2.449,24.989-8.678,34.806-18.511L439.97,195.602 c11.142-11.149,19.571-24.113,25.167-37.917c8.394-20.717,10.48-43.314,6.294-64.971c-4.179-21.643-14.73-42.432-31.46-59.155 c-11.149-11.142-24.114-19.571-37.918-25.166c-20.717-8.401-43.314-10.48-64.971-6.301c-21.643,4.186-42.431,14.737-59.155,31.468 L74.803,236.695c-15.713,15.691-27.552,33.931-35.426,53.352c-11.817,29.154-14.765,60.97-8.863,91.462 c5.888,30.478,20.717,59.696,44.29,83.254c15.698,15.713,33.931,27.552,53.36,35.426c29.146,11.811,60.97,14.758,91.455,8.863 c30.478-5.895,59.696-20.717,83.254-44.29l181.566-181.564L454.821,253.582z"
                  />
                </g>
              </g>
            </svg>
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
