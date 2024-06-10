const WebSocketService = {
  connect(callback) {
    this.socket = new WebSocket("ws://localhost:3001/api/chat");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      callback(message);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
  },

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  },

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  },
};

export default WebSocketService;
