package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ResetPasswordEntity;

public interface ResetPasswordRepository extends JpaRepository<ResetPasswordEntity, Integer>{
	
}
