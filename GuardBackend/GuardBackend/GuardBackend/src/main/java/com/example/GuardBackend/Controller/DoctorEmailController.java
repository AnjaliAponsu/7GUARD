package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Service.DoctorEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/")


public class DoctorEmailController {
    @Autowired
    private DoctorEmailService doctorEmailService;


    @PostMapping("/sendDoctorEmail/{email}")
    public ResponseEntity<ApiResponse> sendDoctorEmail(@PathVariable("doctorWorkEmail") String doctorWorkEmail, @PathVariable("d_password") String d_password ){
        doctorEmailService.sendDoctorEmailService(doctorWorkEmail, d_password);
        return ResponseEntity.ok(new ApiResponse("Login details sent successfully."));
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }
}
