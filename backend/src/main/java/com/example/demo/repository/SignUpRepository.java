package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SignUpEntity;

public interface SignUpRepository extends JpaRepository<SignUpEntity, Integer>{
	
}
