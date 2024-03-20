package com.example.demo.entity;


import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="LoginDetails")
public class LoginEntity {
	public LoginEntity(int id,String userName,String password,String cookie)
	{
		super();
		this.id=id;
		this.userName=userName;
		this.cookie=cookie;
		this.Password=password;
	}
	@Id
	private int id;
	private String cookie;
	public String getCookie() {
		return cookie;
	}
	public void setCookie(String cookie) {
		this.cookie = cookie;
	}
	private String userName;
	private String Password;
	@OneToMany(mappedBy = "user")
    private List<TaskEntity> tasks;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getuserName() {
		return userName;
	}
	public void setuserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public LoginEntity()
	{
		
	}
}
