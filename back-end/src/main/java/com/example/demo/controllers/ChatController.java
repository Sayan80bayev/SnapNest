package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.services.MessageService;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    private MessageService service;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

    }

    @MessageMapping("/message")
    public void processMessage(MessageDTO message) {
        String destination = "/queue/" + message.getRecipient();
        service.sendMessage(message);
        messagingTemplate.convertAndSend(destination, message);
    }
}
