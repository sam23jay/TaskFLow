package com.example.demo.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ResetPasswordEntity;
import com.example.demo.repository.ResetPasswordRepository;

@RestController
@RequestMapping("/reset")
@CrossOrigin(origins = "http://localhost:3000")

public class ResetPasswordController {
	@Autowired
	ResetPasswordRepository fetchData;
	
	@GetMapping("/get")
	List<ResetPasswordEntity>getUsers(){
		return fetchData.findAll();
	}
	@GetMapping("/get/{id}")
	Optional<ResetPasswordEntity>getUserid(@PathVariable("id") int id){
		return fetchData.findById(id);
	}
	@PostMapping("/post")
	public ResetPasswordEntity create(@RequestBody ResetPasswordEntity d) {
		return fetchData.save(d);
	}
	@PutMapping("/put/{id}")
	public ResetPasswordEntity update(@RequestBody ResetPasswordEntity d, @PathVariable("id") int id) {
		return fetchData.save(d);
	}
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id")int id)
	{
		fetchData.deleteById(id);
	}
}
