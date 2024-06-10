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
import com.example.demo.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;

    @GetMapping("/getUser")
    public UserDTO getUserInfo(@RequestParam("email") String email) {
        return service.mapToDto(service.findByEmail(email));
    }

    @GetMapping("/getChats")
    public List<ChatDTO> getChats(@RequestParam("email") String email) {
        List<User> l = service.findChats(email);
        List<ChatDTO> c = new ArrayList<>();
        for (User u : l) {
            c.add(ChatDTO.builder().username(u.getName()).title(u.getEmail()).unreadCount(1).email(u.getEmail())
                    .preview(u.getEmail()).build());
        }
        return c;
    }
}
