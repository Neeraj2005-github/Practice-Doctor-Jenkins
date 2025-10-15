package com.klef.model;

import jakarta.persistence.*;

@Entity
@Table(name="doctor_table")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="doctor_id")
    private int id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @Column(length = 20, nullable = false, unique = true)
    private String mobileno;

    @Column(length = 50)
    private String specialization;

    @Column(length = 50)
    private String qualification;

    @Column(length = 50, unique = true)
    private String medicallicense;

    private Integer yearsofexperience;

    @Column(length = 255)
    private String address;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileno() { return mobileno; }
    public void setMobileno(String mobileno) { this.mobileno = mobileno; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getMedicallicense() { return medicallicense; }
    public void setMedicallicense(String medicallicense) { this.medicallicense = medicallicense; }

    public Integer getYearsofexperience() { return yearsofexperience; }
    public void setYearsofexperience(Integer yearsofexperience) { this.yearsofexperience = yearsofexperience; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
