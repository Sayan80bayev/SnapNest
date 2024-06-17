package com.example.demo.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.services.MessageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebsokcetController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService service;

    @MessageMapping("/message")
    public void processMessage(MessageDTO message) {
        String recipient = "/queue/" + message.getRecipient();
        String sender = "/queue/" + message.getSender();
        MessageDTO respone = service.sendMessage(message);
        messagingTemplate.convertAndSend(recipient, respone);
        messagingTemplate.convertAndSend(sender, respone);
    }

    // @MessageMapping("/seen")
    // public void processSeenReceipt(MessageDTO message) {
    // service.markMessageAsSeen(message.getId());
    // String sender = "/queue/" + message.getSender();
    // messagingTemplate.convertAndSend(sender, message);
    // }

    @MessageMapping("/delete")
    public void processDeleteMessage(MessageDTO message) {
        service.deleteMessage(message.getId());

        message.setDeleted(true);

        String recipient = "/queue/" + message.getRecipient();
        String sender = "/queue/" + message.getSender();
        messagingTemplate.convertAndSend(recipient, message);
        messagingTemplate.convertAndSend(sender, message);
    }

}