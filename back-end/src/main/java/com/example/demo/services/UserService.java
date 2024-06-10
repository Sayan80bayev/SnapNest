package com.example.demo.services;

import com.example.demo.dtos.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserDTO mapToDto(User user) {
        UserDTO udDto = UserDTO.builder().email(user.getEmail()).username(user.getName()).build();
        return udDto;
    }
}
