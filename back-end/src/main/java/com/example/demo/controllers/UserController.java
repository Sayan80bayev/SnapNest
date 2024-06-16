package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.ChatDTO;
import com.example.demo.dtos.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.services.MessageService;
import com.example.demo.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;
    private final MessageService messageService;

    @GetMapping("/getUser")
    public UserDTO getUserInfo(@RequestParam("email") String email) {
        return service.mapToDto(service.findByEmail(email));
    }

    @GetMapping("/getChats")
    public List<ChatDTO> getChats(@RequestParam("email") String email) {
        List<Object[]> results = messageService.findChats(email);
        List<ChatDTO> chatDTOs = new ArrayList<>();

        for (Object[] result : results) {
            String senderEmail = (String) result[0];
            String senderName = (String) result[1];
            Long count = (Long) result[2];

            ChatDTO chatDTO = new ChatDTO();
            chatDTO.setUsername(senderName);
            chatDTO.setTitle(senderEmail);
            chatDTO.setUnreadCount(count);
            chatDTO.setEmail(senderEmail); // Assuming this is the recipient's email
            chatDTO.setPreview(senderEmail);

            chatDTOs.add(chatDTO);
        }

        return chatDTOs;
    }

}
