export const findChatTitleByParticipantEmail = (chat, yourEmail) => {
  for (let member of chat.memberList) {
    if (member.email !== yourEmail) {
      return member;
    }
  }
  return null; // Если чат не найден
};
export const addMessage = (newMessage, setChatData) => {
  setChatData((prevChatData) => {
    return prevChatData.map((chat) => {
      if (chat.id === newMessage.chat_id) {
        return {
          ...chat,
          messageList: [...chat.messageList, newMessage],
        };
      }
      return chat;
    });
  });
};
export const deleteMessage = (messageDeleting, setChatData) => {
  setChatData((prevChatData) => {
    // Map over the previous chat data to find the relevant chat
    return prevChatData.map((chat) => {
      if (chat.id === messageDeleting.chat_id) {
        // Map over the messageList to find the specific message to delete
        const updatedMessages = chat.messageList.map((message) => {
          if (message.id === messageDeleting.id) {
            // Mark the message as deleted
            return { ...message, deleted: true };
          }
          return message;
        });
        // Return the updated chat object with the modified messageList
        return { ...chat, messageList: updatedMessages };
      }
      return chat;
    });
  });
};

export const countUnreadMessages = (chat, yourEmail) => {
  let unreadCount = 0;

  for (let message of chat.messageList) {
    const hasBeenRead = message.read?.some(
      (readEntry) => readEntry.email === yourEmail
    );
    if (message.recipient === yourEmail && !hasBeenRead) {
      unreadCount++;
    }
  }
  return unreadCount;
};

export const findChatById = (chats, chatId) => {
  return chats.find((chat) => chat.id === chatId);
};
export const readMessage = (messageId, userEmail, setChatData) => {
  console.log("reading messages");
  setChatData((prevChatData) => {
    return prevChatData.map((chat) => {
      const updatedMessages = chat.messageList.map((message) => {
        if (message.id === messageId && message.recipient === userEmail) {
          // Check if the user's email is not already in read array
          if (!message.read?.some((r) => r.email === userEmail)) {
            // Add user's email to read array
            const updatedRead = [...(message.read || []), { email: userEmail }];
            return { ...message, read: updatedRead };
          }
        }
        return message;
      });
      return { ...chat, messageList: updatedMessages };
    });
  });
};
