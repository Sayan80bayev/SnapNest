package com.example.demo.services;

import com.example.demo.controllers.ChatController;
import com.example.demo.dtos.MessageDTO;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repositories.MessageRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

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
        User sender = userRepository.findByEmail(messageDTO.getSender()).orElse(null);
        User recipient = userRepository.findByEmail(messageDTO.getRecipient()).orElse(null);

        if (sender == null || recipient == null) {
            throw new IllegalArgumentException("Sender or recipient not found");
        }

        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(messageDTO.getContent());
        message.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        messageRepository.save(message);

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
                false);
    }

    public Message mapToEntity(MessageDTO messageDTO) {
        User sender = userRepository.findByEmail(messageDTO.getSender()).orElse(null);
        User recipient = userRepository.findByEmail(messageDTO.getRecipient()).orElse(null);

        if (sender == null || recipient == null) {
            throw new IllegalArgumentException("Sender or recipient not found");
        }

        return new Message(
                messageDTO.getId(),
                sender,
                recipient,
                messageDTO.getContent(),
                messageDTO.getTimestamp(),
                messageDTO.getSeen());
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
