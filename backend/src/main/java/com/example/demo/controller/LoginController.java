package com.example.demo.controller;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.repository.LoginRepository;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.example.demo.Services.UserService;
import com.example.demo.entity.LoginEntity;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private UserService userService;
    @Operation(summary = "Creates a new Project")

	@ApiResponses(value = 
{
		@ApiResponse(responseCode = "201",description="Project created sucessfull"),
		@ApiResponse(responseCode = "401", description="Projectprojectid is Invalprojectid"),
		@ApiResponse(responseCode = "404", description="Projectprojectid Not Found")
})

    @GetMapping("/get")
    public List<LoginEntity> getUsers() {
    	
        return loginRepository.findAll();
    }
   
    @GetMapping("/get/{id}")
    public ResponseEntity<LoginEntity> getUserById(@PathVariable("id") int id) {
        Optional<LoginEntity> userOptional = loginRepository.findById(id);
        if (userOptional.isPresent()) {
            LoginEntity user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @PostMapping("/create")
    public LoginEntity createUser(@RequestBody LoginEntity user) {
        return loginRepository.save(user);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<LoginEntity> updateUser(@PathVariable("id") int id, @RequestBody LoginEntity user) {
        Optional<LoginEntity> userOptional = loginRepository.findById(id);
        if (userOptional.isPresent()) {
            user.setId(id);
            LoginEntity updatedUser = loginRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/post/auth")
    public String login(@RequestBody UserLoginRequest loginRequest, HttpServletResponse response) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        String cookie = "default";
        System.out.print(username + " " + password);

        boolean isValidUser = userService.isValidUser(username, password);
        if (isValidUser) {
        	System.out.println("Login successful");
            if (loginRequest.isRememberMe()) {
                String rememberMeToken = RememberMeTokenGenerator.generateRememberMeToken();
                Cookie rememberMeCookie = new Cookie("rememberMeToken", rememberMeToken);
                System.out.println("Cookie::  " + rememberMeCookie);
                int rememberMeExpirationInSeconds = 1;
                rememberMeCookie.setMaxAge(rememberMeExpirationInSeconds);
                rememberMeCookie.setPath("/");
                rememberMeCookie.setDomain("localhost");
                rememberMeCookie.setSecure(false); 
                rememberMeCookie.setHttpOnly(true);
                response.addCookie(rememberMeCookie);
                cookie = rememberMeToken;
            }
            return cookie;
        } else {
            return "Invalid username or password";
        }
    }
    @GetMapping("/remember-me/{cookie}")
    public ResponseEntity<String> rememberMe(@PathVariable("cookie") String cookie) {
        LoginEntity user = loginRepository.findByCookie(cookie);

        if (user != null) {
            return ResponseEntity.ok("Automatic login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid remember-me token");
        }
    }

@GetMapping("/get/remember/{cookie}")
public LoginEntity findByrememberToken(@PathVariable("cookie") String cookie){
	return loginRepository.findByCookie(cookie);
	
}
    @GetMapping("/get/id/{userName}")
    public Long getMid(@PathVariable("userName") String userName)
    {
    	return userService.getMainId(userName);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
    	loginRepository.deleteById(id);
        Optional<LoginEntity> userOptional = loginRepository.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	static class UserLoginRequest{
		private int id;
		 private boolean rememberMe;

		    
		    public boolean isRememberMe() {
		        return rememberMe;
		    }

		    public void setRememberMe(boolean rememberMe) {
		        this.rememberMe = rememberMe;
		    }
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		private String Username;
		public String getUsername() {
			return Username;
		}
		public void setUsername(String Username) {
			this.Username = Username;
		}
		public String getPassword() {
			return Password;
		}
		public void setPassword(String Password) {
			this.Password = Password;
		}
		private String Password;
	}
	public static class RememberMeTokenGenerator {
	    public static String generateRememberMeToken() {
	        UUID uuid = UUID.randomUUID();
	        System.out.println(uuid);
	        return uuid.toString();
	    }
	    public static String getRememberMeToken(HttpServletRequest request) {
	        Cookie[] cookies = request.getCookies();
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                if (cookie.getName().equals("rememberMeToken")) {
	                    return cookie.getValue();
	                }
	            }
	        }
	        return null;
	    }
	}
	
}
