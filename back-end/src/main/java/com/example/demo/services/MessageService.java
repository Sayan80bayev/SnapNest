package com.example.demo.services;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.entities.Chat;
import com.example.demo.repositories.ChatRepository;
import com.example.demo.repositories.MessageRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    public Message findById(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    public List<Message> findByEmail(String email) {
        return messageRepository.findBySenderOrRecipientEmail(email);
    }

    public Message findNewestMessage(String senderEmail, String recipientEmail) {
        return messageRepository.findNewestMessage(senderEmail, recipientEmail);
    }

    public List<Object[]> findChats(String email) {
        return messageRepository.countUnseenMessagesBySender(email);
    }

    public MessageDTO sendMessage(MessageDTO messageDTO) {
        // Retrieve sender and recipient from the repository
        User sender = userRepository.findByEmail(messageDTO.getSender()).orElse(null);
        User recipient = userRepository.findByEmail(messageDTO.getRecipient()).orElse(null);

        // Check if either sender or recipient is not found
        if (sender == null || recipient == null) {
            throw new IllegalArgumentException("Sender or recipient not found");
        }

        Chat c = null;
        // Try to retrieve the chat by ID
        try {
            if (messageDTO.getChat_id() != null) {
                c = chatRepository.findById(messageDTO.getChat_id()).orElse(null);
            }
        } catch (Exception e) {
            // Add logging or handle the exception if necessary
            System.err.println("Error retrieving chat: " + e.getMessage());
        }

        // Create a new message instance
        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(messageDTO.getContent());
        message.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        message.setChat(c);

        // If no chat was found or provided, create a new chat
        if (c == null) {
            c = new Chat();
            c.setChatMembers(new ArrayList<>(Arrays.asList(sender, recipient)));
            c.setMessages(new ArrayList<>());
            message.setChat(c);
        }

        // Add the message to the chat
        c.getMessages().add(message);
        chatRepository.save(c);

        // Save the message
        messageRepository.save(message);

        // Convert the message entity to DTO and return it
        return mapToDTO(message);
    }

    public void markMessageAsSeen(Long messageId) {
        Message m = messageRepository.findById(messageId).orElse(null);
        m.setSeen(true);
        messageRepository.save(m);
    }

    public MessageDTO mapToDTO(Message message) {
        return new MessageDTO(
                message.getId(),
                message.getSender().getUsername(),
                message.getRecipient().getUsername(),
                message.getContent(),
                message.getTimestamp(),
                message.getSeen(),
                false,
                message.getChat().getId());
    }

    public Message mapToEntity(MessageDTO messageDTO) {
        User sender = userRepository.findByEmail(messageDTO.getSender()).orElse(null);
        User recipient = userRepository.findByEmail(messageDTO.getRecipient()).orElse(null);

        if (sender == null || recipient == null) {
            throw new IllegalArgumentException("Sender or recipient not found");
        }
        Chat c = chatRepository.findById(messageDTO.getChat_id()).orElse(null);
        if (c == null) {
            c = new Chat();
            c.setChatMembers(new ArrayList<>(Arrays.asList(sender, recipient)));
        }
        return new Message(
                messageDTO.getId(),
                sender,
                recipient,
                messageDTO.getContent(),
                messageDTO.getTimestamp(),
                messageDTO.getSeen(),
                c);
    }

    public List<Message> getChat(String email) {
        return messageRepository.findBySenderOrRecipientEmail(email);
    }

    public List<Message> getReceivedMessages(String email) {
        User recipient = userRepository.findByEmail(email).orElse(null);
        if (recipient == null) {
            throw new IllegalArgumentException("Recipient not found");
        }
        return messageRepository.findByRecipient(recipient);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
