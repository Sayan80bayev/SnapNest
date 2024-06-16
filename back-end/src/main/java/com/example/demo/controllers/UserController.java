package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Chat;
import com.example.demo.dtos.ChatDTO;
import com.example.demo.dtos.UserDTO;
import com.example.demo.services.ChatService;
import com.example.demo.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;
    private final ChatService chatService;

    @GetMapping("/getUser")
    public UserDTO getUserInfo(@RequestParam("email") String email) {
        return service.mapToDto(service.findByEmail(email));
    }

    @GetMapping("/getChats")
    public List<ChatDTO> getChats(@RequestParam("email") String email) {
        List<ChatDTO> chatDTOs = new ArrayList<>();
        List<Chat> chat = chatService.findByMember(email);
        for (Chat c : chat) {
            chatDTOs.add(chatService.mapToChatDTO(c));
        }
        return chatDTOs;
    }

}
