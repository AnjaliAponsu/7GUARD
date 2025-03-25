package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/")


public class OtpController {
    @Autowired
    private OtpService otpService;

    private String email;

    @PostMapping("/sendOtpMail/{email}")
    public ResponseEntity<ApiResponse> sendOtpMail(@PathVariable("email") String email, @PathVariable("parentNic") String parentNic){
        otpService.sendOtpService(email, parentNic);
        return ResponseEntity.ok(new ApiResponse("OTP sent successfully."));
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }

}
