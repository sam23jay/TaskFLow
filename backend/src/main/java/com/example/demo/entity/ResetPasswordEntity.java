package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ResetPasswordDetails")
public class ResetPasswordEntity 
{
	public ResetPasswordEntity(int id, String userName,String password)
	{
		this.id=id;
		this.userName=userName;
		this.Password=password;
	}
	@Id
	private int id;
	private String userName;
	private String Password;
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
	
	public ResetPasswordEntity()
	{
		
	}
}


