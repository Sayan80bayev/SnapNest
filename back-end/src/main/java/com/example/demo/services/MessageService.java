package com.example.demo.services;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.dtos.UserDTO;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.entities.Chat;
import com.example.demo.repositories.ChatRepository;
import com.example.demo.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    public Message findById(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    public List<Message> findByEmail(String email) {
        return messageRepository.findBySenderOrRecipientEmail(email);
    }

    // public Message findNewestMessage(String senderEmail, String recipientEmail) {
    // return messageRepository.findNewestMessage(senderEmail, recipientEmail);
    // }

    // public List<Object[]> findChats(String email) {
    // return messageRepository.countUnseenMessagesBySender(email);
    // }

    public MessageDTO sendMessage(MessageDTO messageDTO) {
        // Retrieve sender and recipient from the repository
        User sender = userService.findByEmail(messageDTO.getSender());
        User recipient = userService.findByEmail(messageDTO.getRecipient());

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
        // messageRepository.save(message);

        // Convert the message entity to DTO and return it
        return mapToDTO(message);
    }

    // public void markMessageAsSeen(Long messageId) {
    // Message m = messageRepository.findById(messageId).orElse(null);
    // m.setRead(true);
    // messageRepository.save(m);
    // }

    public MessageDTO mapToDTO(Message message) {
        List<UserDTO> read = null;
        try {
            read = message.getRead().stream().map(u -> userService.mapToDto(u)).collect(Collectors.toList());

        } catch (Exception e) {
        }
        return new MessageDTO(
                message.getId(),
                message.getSender().getUsername(),
                message.getRecipient().getUsername(),
                message.getContent(),
                message.getTimestamp(),
                read,
                false,
                message.getChat().getId());
    }

    public Message mapToEntity(MessageDTO messageDTO) {
        User sender = userService.findByEmail(messageDTO.getSender());
        User recipient = userService.findByEmail(messageDTO.getRecipient());

        if (sender == null || recipient == null) {
            throw new IllegalArgumentException("Sender or recipient not found");
        }
        Chat c = chatRepository.findById(messageDTO.getChat_id()).orElse(null);
        if (c == null) {
            c = new Chat();
            c.setChatMembers(new ArrayList<>(Arrays.asList(sender, recipient)));
        }
        List<User> read = messageDTO.getRead().stream().map(u -> userService.mapToEntity(u))
                .collect(Collectors.toList());

        return new Message(
                messageDTO.getId(),
                sender,
                recipient,
                messageDTO.getContent(),
                messageDTO.getTimestamp(),
                read,
                c);
    }

    public List<Message> getChat(String email) {
        return messageRepository.findBySenderOrRecipientEmail(email);
    }

    public List<Message> getReceivedMessages(String email) {
        User recipient = userService.findByEmail(email);
        if (recipient == null) {
            throw new IllegalArgumentException("Recipient not found");
        }
        return messageRepository.findByRecipient(recipient);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
