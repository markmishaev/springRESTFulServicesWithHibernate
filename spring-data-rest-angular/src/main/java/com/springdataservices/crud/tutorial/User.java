package com.springdataservices.crud.tutorial;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Id;

@Entity
@Table(name = "Users")
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
	
	@Column(name="isactive")
	private boolean isActive;
	
	public User() 
	{
	}

	public User(String firstNameParam, String lastNameParam) 
	{
		this.firstName = firstNameParam;
		this.lastName = lastNameParam;
		this.isActive = true;
	}
	
	public User(String firstNameParam, String lastNameParam, boolean isActiveParam) 
	{
		this(firstNameParam,lastNameParam);
		this.isActive = isActiveParam; 
	}
	
	
	public Integer getId() 
	{
		return id;
	}

	public void setId(Integer id) 
	{
		this.id = id;
	}

	public String getFirstName() 
	{
		return firstName;
	}

	public void setFirstName(String firstName) 
	{
		this.firstName = firstName;
	}
	
	public String getLastName() 
	{
		return lastName;
	}

	public void setLastName(String lastName) 
	{
		this.lastName = lastName;
	}

	public boolean getIsActive() 
	{
		return isActive;
	}

	public void setIsActive(boolean isActive) 
	{
		this.isActive = isActive;
	}
	
	@Override
	public String toString() 
	{		
		return String.format("User: id: %s, firstName: %s, lastName: %s, isActive: %s",
									this.id, this.firstName, this.lastName, this.isActive); 
	}	
}