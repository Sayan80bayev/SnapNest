export const findChatTitleByParticipantEmail = (chat, yourEmail) => {
  for (let member of chat.memberList) {
    if (member.email !== yourEmail) {
      return member.username;
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
export const countUnreadMessages = (chat, yourEmail) => {
  let unreadCount = 0;

  for (let message of chat.messageList) {
    if (message.recipient === yourEmail && !message.read.includes(yourEmail)) {
      unreadCount++;
    }
  }
  return unreadCount;
};
