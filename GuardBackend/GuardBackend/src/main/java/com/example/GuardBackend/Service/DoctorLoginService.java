package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.DoctorDTO;
import com.example.GuardBackend.Entity.Doctor;
import com.example.GuardBackend.Repository.DoctorRepo;
import com.example.GuardBackend.Response.DoctorLoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorLoginService {
    @Autowired
    private DoctorRepo doctorRepo;

    public DoctorLoginResponse loginDoctor (DoctorDTO doctorDTO) {
        Doctor doctor = doctorRepo.findByDoctorWorkEmail(doctorDTO.getDoctorWorkEmail());

        if (doctor != null) {
            String loginPassword = doctorDTO.getD_password();
            String password = doctor.getD_password();
            String email = doctor.getDoctorWorkEmail();

            boolean isPasswordRight = loginPassword.equals(password);

            if (isPasswordRight) {
                return new DoctorLoginResponse("Doctor Login Success", true, email);
            } else {
                return new DoctorLoginResponse("Login Failed", false, null);
            }
        }

        else {
            return new DoctorLoginResponse("Doctor not found", false, null);
        }
    }
}
