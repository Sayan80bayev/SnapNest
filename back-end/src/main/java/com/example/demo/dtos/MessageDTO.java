package com.example.demo.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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