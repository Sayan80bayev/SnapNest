package com.example.demo.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private Long id;
    private String title;
    private List<UserDTO> memberList;
    private List<MessageDTO> messageList;
}
