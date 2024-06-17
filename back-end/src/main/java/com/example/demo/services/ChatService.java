package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dtos.ChatDTO;
import com.example.demo.entities.Chat;
import com.example.demo.repositories.ChatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository repository;
    private final UserService userService;
    private final MessageService messageService;

    public List<Chat> findAll() {
        return repository.findAll();
    }

    public void save(Chat chat) {
        repository.save(chat);
    }

    public Chat findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Chat> findByMember(String email) {
        return repository.findByMember(email);
    }

    public ChatDTO mapToChatDTO(Chat chat) {
        return ChatDTO.builder()
                .id(chat.getId())
                .memberList(
                        chat.getChatMembers().stream().map(u -> userService.mapToDto(u)).collect(Collectors.toList()))
                .messageList(
                        chat.getMessages().stream().map(m -> messageService.mapToDTO(m)).collect(Collectors.toList()))
                .build();
    }

    public Chat mapToEntity(ChatDTO chatDTO) {
        return Chat.builder()
                .messages(chatDTO.getMessageList().stream().map(m -> messageService.mapToEntity(m))
                        .collect(Collectors.toList()))
                .id(chatDTO.getId())
                .chatMembers(chatDTO.getMemberList().stream().map(u -> userService.mapToEntity(u))
                        .collect(Collectors.toList()))
                .messages(chatDTO.getMessageList().stream().map(m -> messageService.mapToEntity(m))
                        .collect(Collectors.toList()))
                .build();
    }
}
