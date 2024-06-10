package com.example.demo.controllers;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public MessageDTO sendMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.sendMessage(messageDTO);
    }

    @GetMapping("/received/{email}")
    public List<MessageDTO> getReceivedMessages(@PathVariable String email) {
        return messageService.getReceivedMessages(email).stream()
                .map(messageService::mapToDTO)
                .collect(Collectors.toList());
    }
}
