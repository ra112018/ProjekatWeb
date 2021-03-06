package beans;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

public abstract class User {

	private String userName;
	private String password;
	private String name;
	private String surname;
	//private Gender gender;
	private String gender;
	private String birthDate;	
	private Role role;
	private boolean deleted;
	
	public User() {}

	public User(String userName, String password, String name, String surname, String gender) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	public boolean isDeleted() {
		return deleted;
	}
	
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
		

	
}
