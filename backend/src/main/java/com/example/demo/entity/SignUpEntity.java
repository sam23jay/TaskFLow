package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SignUpDetails")
public class SignUpEntity {
	
	public SignUpEntity() {
		
	}

	@Id
	private int id;
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}

	private String country;
	private String profession;
	public SignUpEntity(int id, String name, long phoneNumber, String email, String userName, String password,String country,String profession) {
		super();
		this.id = id;
		Name = name;
		PhoneNumber = phoneNumber;
		Email = email;
		this.userName = userName;
		Password = password;
		this.country=country;
		this.profession=profession;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public long getPhoneNumber() {
		return PhoneNumber;
	}
	public void setPhoneNumber(long phoneNumber) {
		PhoneNumber = phoneNumber;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}

	private String Name;
	private long PhoneNumber ;
	private String Email;
	private String userName;
	private String Password;

}

