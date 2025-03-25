package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Service.StaffEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public class StaffEmailController {
    @Autowired
    private StaffEmailService staffEmailService;

    @PostMapping("/sendStaffEmail/{email}")
    public ResponseEntity<ApiResponse> sendStaffEmail(@PathVariable("workEmail") String workEmail, @PathVariable("s_password") String s_password ){
        staffEmailService.sendStaffEmailService(workEmail, s_password);
        return ResponseEntity.ok(new ApiResponse("Login details sent successfully."));
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }
}
