package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT c FROM Chat c JOIN c.chatMembers m WHERE m.email = :email")
    List<Chat> findByMember(String email);
}
