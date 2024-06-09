import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
  }

  connect(onMessageReceived) {
    const socket = new SockJS("http://localhost:3001/ws");
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      this.connected = true;
      console.log("Connected: " + frame);
      this.stompClient.subscribe("/topic/messages", (message) => {
        try {
          onMessageReceived(JSON.parse(message.body));
        } catch (error) {
          console.error("Error parsing message body:", error);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.stompClient.onWebSocketError = (event) => {
      console.error("WebSocket error: ", event);
    };

    this.stompClient.activate();
  }

  sendMessage(message) {
    if (this.connected) {
      this.stompClient.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(message),
      });
    }
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.deactivate();
    }
    this.connected = false;
  }
}

export default new WebSocketService();
