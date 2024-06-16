package com.example.demo.dtos;

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
    private boolean seen;
    private boolean deleted;
    private Long chat_id;

    public boolean getSeen() {
        return this.seen;
    }
}