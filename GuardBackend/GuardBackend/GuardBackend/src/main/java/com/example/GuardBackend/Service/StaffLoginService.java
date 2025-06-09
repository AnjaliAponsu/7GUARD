package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.StaffDTO;
import com.example.GuardBackend.Entity.Staff;
import com.example.GuardBackend.Repository.StaffRepo;
import com.example.GuardBackend.Response.StaffLoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffLoginService {
    @Autowired
    private StaffRepo staffRepo;

    public StaffLoginResponse loginStaff(StaffDTO staffDTO) {
        Staff staff = staffRepo.findByWorkEmail(staffDTO.getWorkEmail());

        if (staff != null) {
            String loginPassword = staffDTO.getS_password();
            String password = staff.getS_password();
            String type = staff.getS_jobTitle();
            String email = staff.getWorkEmail();

            boolean isPasswordRight = loginPassword.equals(password);

            if (isPasswordRight) {
                return new StaffLoginResponse("Staff login successful", type, email);
            } else {
                return new StaffLoginResponse("Login failed", null, null);
            }
        }
        else {
            return new StaffLoginResponse("Staff not found", null, null);
        }
    }
}
