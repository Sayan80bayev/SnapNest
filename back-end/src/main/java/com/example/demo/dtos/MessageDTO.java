package com.example.demo.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessageDTO {
    private Long id;
    private String sender;
    private String recipient;
    private String content;
    private String timestamp;
    private List<UserDTO> read;
    private boolean deleted;
    private Long chat_id;
}