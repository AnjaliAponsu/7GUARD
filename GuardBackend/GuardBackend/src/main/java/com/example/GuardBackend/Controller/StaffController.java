package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.StaffDTO;
import com.example.GuardBackend.Entity.Staff;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Response.StaffLoginResponse;
import com.example.GuardBackend.Service.StaffLoginService;
import com.example.GuardBackend.Service.StaffServiceIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/")

public class StaffController {
    @Autowired
    private StaffServiceIMPL staffServiceIMPL;

    @Autowired
    private StaffLoginService staffLoginService;

    @PostMapping("/saveStaff")
    public ResponseEntity<ApiResponse>saveStaff(@RequestBody StaffDTO staffDTO){
        staffServiceIMPL.addStaff(staffDTO);
        return ResponseEntity.ok(new ApiResponse("Staff member saved successfully. Login details sent"));
    }

    @PostMapping("/loginStaff")
    public ResponseEntity<StaffLoginResponse>loginStaff (@RequestBody StaffDTO staffDTO){
        StaffLoginResponse response = staffLoginService.loginStaff(staffDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateStaff/{s_id}")
    public ResponseEntity<ApiResponse>updateStaff(@PathVariable Integer s_id, @RequestBody Staff staffDTO){
        ApiResponse response = staffServiceIMPL.updateStaff(s_id, staffDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getStaffById/{s_id}")
    public ResponseEntity<StaffDTO> getStaffById(@PathVariable Integer s_id) {
        return ResponseEntity.ok(staffServiceIMPL.getStaffById(s_id));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getStaffByWorkEmail/{workEmail}")
    public ResponseEntity<StaffDTO> getStaffByWorkEmail(@PathVariable String workEmail) {
        return ResponseEntity.ok(staffServiceIMPL.getStaffByWorkEmail(workEmail));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/staffUpdatePassword")
    public ResponseEntity<ApiResponse>staffUpdatePassword (@RequestBody StaffDTO staffDTO){
        ApiResponse response = staffServiceIMPL.updatePassword(staffDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getAllStaff")
    public ResponseEntity<List<Staff>> getAllStaff(){
        List<Staff> staff = staffServiceIMPL.getAllStaff();
        return ResponseEntity.ok(staff);
    }


}
