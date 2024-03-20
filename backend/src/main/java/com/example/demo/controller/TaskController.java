package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.repository.TaskRepository;
import com.example.demo.entity.*;
import com.example.demo.entity.TaskEntity.Priority;


@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    
    @GetMapping("/get")
    public List<TaskEntity> getTasks() {
        return taskRepository.findAll();
    }
    @GetMapping("/get/{id}")
	Optional<TaskEntity>getUserid(@PathVariable("id") Long id){
		return taskRepository.findById(id);
	}

    @GetMapping("/get/foreign/{userId}")
    public List<TaskEntity> getTasksByUserId(@PathVariable("userId") Long userId) {
        // Call the taskRepository to retrieve tasks by user ID
        List<TaskEntity> tasks = taskRepository.findByUserId(userId);
        return tasks;
    }
    @GetMapping("/get/foreign/{userId}/{priority}")
    public List<TaskEntity> getTasksByUserIdAndPriority(@PathVariable("userId") Long userId, @PathVariable("priority") Priority priority) {
        // Call the taskRepository to retrieve tasks by user ID
        List<TaskEntity> tasks = taskRepository.findByUserIdAndPriority(userId,priority);
        return tasks;
    } 
    
    @PostMapping("/post")
    public TaskEntity createTask(@RequestBody TaskEntity task) {
        return taskRepository.save(task);
    }
    
    @PutMapping("/put/{id}")
    public ResponseEntity<TaskEntity> updateTask(@PathVariable("id") Long id, @RequestBody TaskEntity task) {
        Optional<TaskEntity> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            task.setId(id);
            TaskEntity updatedTask = taskRepository.save(task);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        Optional<TaskEntity> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
