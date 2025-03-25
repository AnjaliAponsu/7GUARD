package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.DoctorDTO;
import com.example.GuardBackend.Entity.Doctor;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Response.DoctorLoginResponse;
import com.example.GuardBackend.ServiceImplementation.ChildService;
import com.example.GuardBackend.Service.DoctorLoginService;
import com.example.GuardBackend.ServiceImplementation.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/")

public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ChildService childService;

    @Autowired
    private DoctorLoginService doctorLoginService;

    @PostMapping("/saveDoctor")
    public ResponseEntity<ApiResponse> saveDoctor (@RequestBody DoctorDTO doctorDTO){
        doctorService.addDoctor(doctorDTO);
        return ResponseEntity.ok(new ApiResponse("Doctor saved successfully. Login details sent"));
    }

    @PostMapping("/loginDoctor")
    public ResponseEntity<DoctorLoginResponse>loginDoctor (@RequestBody DoctorDTO doctorDTO){
        DoctorLoginResponse response = doctorLoginService.loginDoctor(doctorDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getAllDoctors")
    public ResponseEntity<List<Doctor>> getDoctors(){
        List<Doctor> doctor = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctor);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getDoctorNames")
    public List<String> getDoctorNames() {
        return childService.getDoctorNames();
    }

    @PutMapping("/updateDoctor/{d_id}")
    public ResponseEntity<ApiResponse>updateDoctor(@PathVariable Integer d_id, @RequestBody Doctor doctorDTO){
        ApiResponse response = doctorService.updateDoctor(d_id, doctorDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getDoctorByWorkEmail/{doctorWorkEmail}")
    public ResponseEntity<DoctorDTO> getDoctorByWorkEmail(@PathVariable String doctorWorkEmail) {
        return ResponseEntity.ok(doctorService.getDoctorByWorkEmail(doctorWorkEmail));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getDoctorById/{d_id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Integer d_id) {
        return ResponseEntity.ok(doctorService.getDoctorById(d_id));
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/doctorUpdatePassword")
    public ResponseEntity<ApiResponse>doctorUpdatePassword (@RequestBody DoctorDTO doctorDTO){
        ApiResponse response = doctorService.updatePassword(doctorDTO);
        return ResponseEntity.ok(response);
    }
}
