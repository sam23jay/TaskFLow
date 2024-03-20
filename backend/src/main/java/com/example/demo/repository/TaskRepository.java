package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.TaskEntity;
import com.example.demo.entity.TaskEntity.Priority;


public interface TaskRepository extends JpaRepository<TaskEntity, Long>{
    Optional<TaskEntity> findById(Long id);

	List<TaskEntity> findByUserId(Long userId);



	List<TaskEntity> findByUserIdAndPriority(Long userId, Priority priority);

}
