package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LoginEntity;
import com.example.demo.repository.LoginRepository;

@Service
public class UserService {
	@Autowired
	LoginRepository loginRepository;
	
	public boolean isValidUser(String userName, String password) {
		LoginEntity user = loginRepository.findByUserName(userName);
		return user !=null && user.getPassword().equals(password);
	}
	public Long getMainId(String userName) {
		LoginEntity user = loginRepository.findByUserName(userName);
		return (long)user.getId();
	}
	
}
