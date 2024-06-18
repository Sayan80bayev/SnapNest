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
    if (message.recipient === yourEmail && !message.read?.includes(yourEmail)) {
      unreadCount++;
    }
  }
  return unreadCount;
};
export const findChatById = (chats, chatId) => {
  return chats.find((chat) => chat.id === chatId);
};
