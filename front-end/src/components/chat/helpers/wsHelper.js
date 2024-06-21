export const deleteMessageWS = (clientRef, message) => {
  if (clientRef.current && clientRef.current.connected) {
    clientRef.current.publish({
      destination: "/app/delete",
      body: JSON.stringify(message),
    });
  } else {
    console.error("Client is not connected");
  }
};
export const readMessageWS = async (
  clientRef,
  message,
  email,
  markedAsReadMessages
) => {
  if (clientRef.current && clientRef.current.connected) {
    // Check if the message has already been marked as read
    if (markedAsReadMessages.has(message.id)) {
      return; // Exit early if message has already been sent
    }

    if (
      message.sender !== email &&
      !message.read.some((user) => user.email === email)
    ) {
      console.log("Marking message as read:", message);
      try {
        // Publish the message to the WebSocket
        await clientRef.current.publish({
          destination: "/app/read",
          body: JSON.stringify(message),
        });
        // Add the message ID to the set after successfully marking as read
        markedAsReadMessages.add(message.id);
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  } else {
    console.error("Client is not connected");
  }
};
export const sendMessageWS = (clientRef, message) => {
  if (clientRef.current && clientRef.current.connected) {
    clientRef.current.publish({
      destination: "/app/message",
      body: JSON.stringify(message),
    });
  } else {
    console.error("Client is not connected");
  }
};
