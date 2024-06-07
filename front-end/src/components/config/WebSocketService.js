import SockJS from "sockjs-client";
import Stomp from "stompjs";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.stompClient = null;
    this.connected = false;
  }

  connect(onMessageReceived) {
    this.socket = new SockJS("/ws");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, () => {
      this.connected = true;
      this.stompClient.subscribe("/topic/messages", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message) {
    if (this.connected) {
      this.stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.connected = false;
  }
}

export default new WebSocketService();
