package com.example.demo.repositories;

import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRecipient(User recipient);

    @Query("SELECT m FROM Message m WHERE m.sender.email = :email OR m.recipient.email = :email")
    List<Message> findBySenderOrRecipientEmail(String email);
}
