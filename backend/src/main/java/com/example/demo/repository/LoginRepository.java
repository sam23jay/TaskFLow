package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.LoginEntity;
@Repository
public interface LoginRepository extends JpaRepository<LoginEntity, Integer>{
 LoginEntity findByUserName(String userName);


LoginEntity findByCookie(String rememberMeToken);
    
}