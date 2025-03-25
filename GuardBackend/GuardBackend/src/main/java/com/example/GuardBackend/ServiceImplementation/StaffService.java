package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.StaffDTO;
import com.example.GuardBackend.Entity.Staff;
import com.example.GuardBackend.Response.ApiResponse;
import java.util.List;

public interface StaffService {
    void addStaff(StaffDTO staffDTO);

    void sendEmailToStaff(String workEmail, String s_password);

    ApiResponse updateStaff(Integer sId, Staff staffDTO);

    StaffDTO getStaffById(Integer sId);

    StaffDTO getStaffByWorkEmail(String workEmail);
    ApiResponse updatePassword(StaffDTO staffDTO);

    List<Staff> getAllStaff();
}
