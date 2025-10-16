package com.klef.controller;

import com.klef.model.Doctor;
import com.klef.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor") // Base path for all endpoints

@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/")
    public String home() {
        return "Jenkins Full Stack Deployment Demo";
    }

    // Add doctor
    @PostMapping("/adddoctor")
    public ResponseEntity<String> addDoctor(@RequestBody Doctor doctor) {
        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor added successfully");
    }

    // View all doctors
    @GetMapping("/viewalldoctors")
    public List<Doctor> viewAllDoctors() {
        return doctorRepository.findAll();
    }

    // Delete doctor
    @DeleteMapping("/deletedoctor")
    public ResponseEntity<String> deleteDoctor(@RequestParam int id) {
        doctorRepository.deleteById(id);
        return ResponseEntity.ok("Doctor deleted successfully");
    }

    // Get doctor by id
    @GetMapping("/{id}") // <-- fixed here
    public ResponseEntity<Doctor> getDoctor(@PathVariable int id) {
        return doctorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update doctor
    @PutMapping("/updatedoctor/{id}")
    public ResponseEntity<String> updateDoctor(@PathVariable int id, @RequestBody Doctor updatedDoctor) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctor.setName(updatedDoctor.getName());
                    doctor.setEmail(updatedDoctor.getEmail());
                    doctor.setMobileno(updatedDoctor.getMobileno());
                    doctor.setSpecialization(updatedDoctor.getSpecialization());
                    doctor.setQualification(updatedDoctor.getQualification());
                    doctor.setMedicallicense(updatedDoctor.getMedicallicense());
                    doctor.setYearsofexperience(updatedDoctor.getYearsofexperience());
                    doctor.setAddress(updatedDoctor.getAddress());
                    doctorRepository.save(doctor);
                    return ResponseEntity.ok("Doctor updated successfully");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found"));
    }
}
