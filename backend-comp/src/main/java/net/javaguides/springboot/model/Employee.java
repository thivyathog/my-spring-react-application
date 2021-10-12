package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;

	@Column(name = "annualLeave")
	private String annualLeave;

	@Column(name = "casualLeave")
	private String casualLeave;

	@Column(name = "medicalLeave")
	private String medicalLeave;

	public Employee() {
		
	}
	
	public Employee(String firstName, String lastName, String emailId,String annualLeave,String casualLeave,String medicalLeave) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.annualLeave= annualLeave;
		this.casualLeave = casualLeave;
		this.medicalLeave = medicalLeave;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public void setCasualLeave(String casualLeave){ this.casualLeave=casualLeave; }
	public String getCasualLeave(){ return casualLeave; }

	public void setMedicalLeave(String medicalLeave){ this.medicalLeave=medicalLeave; }
	public String getMedicalLeave(){ return medicalLeave; }

	public void setAnnualLeave(String annualLeave){ this.annualLeave=annualLeave; }
	public String getAnnualLeave(){ return annualLeave; }


}
