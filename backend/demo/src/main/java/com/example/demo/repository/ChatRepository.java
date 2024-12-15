package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long>{
    
}
