package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;

@Entity
@Table(name = "TaskDetails1")

public class TaskEntity {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    private String taskName;
	    private String description;
	    private LocalDate dueDate;
	    private LocalTime dueTime;
	    
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private LoginEntity user;
	    
	    public LoginEntity getUser() {
	        return user;
	    }
	    
	    public void setUser(LoginEntity user) {
	        this.user = user;
	    }
	    
	    

	    public TaskEntity(Long id, String taskName, String description, LocalDate dueDate, LocalTime dueTime,
	            Priority priority, Status status,LoginEntity user) {
	        this.id = id;
	        this.taskName = taskName;
	        this.description = description;
	        this.dueDate = dueDate;
	        this.dueTime = dueTime;
	        this.priority = priority;
	        this.status = status;
	        this.user = user;

	    }
	    
    public TaskEntity()
    {
    	
    }
    
    
    @Override
	public String toString() {
		return "TaskEntity [id=" + id + ", taskName=" + taskName + ", description=" + description + ", dueDate="
				+ dueDate + ", dueTime=" + dueTime + ", priority=" + priority + ", status=" + status + "]";
	}
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public LocalTime getDueTime() {
		return dueTime;
	}

	public void setDueTime(LocalTime dueTime) {
		this.dueTime = dueTime;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
    
    @Enumerated(EnumType.STRING)
    private Priority priority;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    public enum Priority {
        LOW, MID	, HIGH
    }
    
    public enum Status {
        PENDING, IN_PROGRESS, COMPLETED
    }
}
