package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.JwtRequest;
import com.example.demo.dtos.JwtResponse;
import com.example.demo.dtos.RegisterRequest;
import com.example.demo.entities.User;
import com.example.demo.services.AuthenticationService;
import com.example.demo.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final AuthenticationService service;
    private final UserService uService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {
        // User user = uService.findByEmail(request.getEmail());
        // if (user != null) {
        // return ResponseEntity.badRequest().body("User already exists");
        // }
        log.debug("Debugging message");
        log.info("Informational message");
        log.warn("Warning message");
        log.error("Error message");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> auth(
            @RequestBody JwtRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
