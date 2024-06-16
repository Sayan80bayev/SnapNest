package com.example.demo.controllers;

import com.example.demo.dtos.MessageDTO;
import com.example.demo.entities.Message;
import com.example.demo.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    public MessageDTO sendMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.sendMessage(messageDTO);
    }

    @GetMapping("/received/{email}")
    public List<MessageDTO> getReceivedMessages(@PathVariable String email) {
        return messageService.getChat(email).stream()
                .map(messageService::mapToDTO)
                .collect(Collectors.toList());
    }

    // @DeleteMapping("/delete/{id}")
    // public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
    // try {
    // Message m = messageService.findById(id);
    // messageService.deleteMessage(id);
    // messagingTemplate.convertAndSend("/queue/" + m.getSender(), id);
    // return new ResponseEntity<>("Message deleted successfully", HttpStatus.OK);
    // } catch (Exception e) {
    // return new ResponseEntity<>(e.getMessage(),
    // HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }
}
