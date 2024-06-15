package com.example.demo.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.services.MessageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService service;

    @MessageMapping("/message")
    public void processMessage(MessageDTO message) {
        String destination = "/queue/" + message.getRecipient();
        String destination2 = "/queue/" + message.getSender();
        MessageDTO respone = service.sendMessage(message);
        messagingTemplate.convertAndSend(destination, respone);
        messagingTemplate.convertAndSend(destination2, respone);
    }

    @MessageMapping("/seen")
    public void processSeenReceipt(MessageDTO message) {
        service.markMessageAsSeen(message.getId());
        String senderDestination = "/queue/" + message.getSender();
        messagingTemplate.convertAndSend(senderDestination, message);
    }

    @MessageMapping("/delete")
    public void processDeleteMessage(MessageDTO message) {
        service.deleteMessage(message.getId());

        message.setDeleted(true);

        String senderDestination = "/queue/" + message.getRecipient();
        messagingTemplate.convertAndSend(senderDestination, message);
    }

}
