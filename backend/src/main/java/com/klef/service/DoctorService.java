package com.klef.service;

import com.klef.model.Doctor;
import com.klef.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateDoctor(int id, Doctor updatedDoctor) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setMobileno(updatedDoctor.getMobileno());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setMedicallicense(updatedDoctor.getMedicallicense());
        doctor.setYearsofexperience(updatedDoctor.getYearsofexperience());
        doctor.setAddress(updatedDoctor.getAddress());
        return doctorRepository.save(doctor);
    }

    public String deleteDoctor(int id) {
        doctorRepository.deleteById(id);
        return "Doctor deleted successfully";
    }
}
