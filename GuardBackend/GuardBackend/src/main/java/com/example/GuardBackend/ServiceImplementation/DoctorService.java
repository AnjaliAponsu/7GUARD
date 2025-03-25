package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.DoctorDTO;
import com.example.GuardBackend.Entity.Doctor;
import com.example.GuardBackend.Response.ApiResponse;
import java.util.List;

public interface DoctorService {
    void addDoctor(DoctorDTO doctorDTO);

    void sendEmailToDoctor(String doctorWorkEmail, String d_password);

    List<Doctor> getAllDoctors();
    ApiResponse updateDoctor(Integer d_id, Doctor doctorDTO);

    DoctorDTO getDoctorByWorkEmail(String doctorWorkEmail);

    DoctorDTO getDoctorById(Integer dId);
    ApiResponse updatePassword(DoctorDTO doctorDTO);
}
