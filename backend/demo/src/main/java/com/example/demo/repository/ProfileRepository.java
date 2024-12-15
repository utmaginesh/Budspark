package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Profiles;

public interface ProfileRepository extends JpaRepository<Profiles, Long>{
    
}
