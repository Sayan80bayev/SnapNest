package com.example.demo.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.UserDTO;
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
    public List<UserDTO> getChats(@RequestParam("email") String email) {
        return service.findChats(email).stream().map(c -> service.mapToDto(c)).collect(Collectors.toList());
    }
}
