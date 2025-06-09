package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.AdminFeedbackDTO;
import com.example.GuardBackend.DTO.UserFeedbackDTO;
import com.example.GuardBackend.ServiceImplementation.AdminFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin-feedback")
@CrossOrigin
public class AdminFeedbackController {

    @Autowired
    private AdminFeedbackService adminFeedbackService;

    @PostMapping
    public AdminFeedbackDTO saveAdminFeedback(@RequestBody AdminFeedbackDTO adminFeedbackDTO) {
        return adminFeedbackService.saveAdminFeedback(adminFeedbackDTO);
    }

    @PutMapping("/{id}")
    public AdminFeedbackDTO updateAdminFeedback(@PathVariable Long id, @RequestBody AdminFeedbackDTO adminFeedbackDTO) {
        return adminFeedbackService.updateAdminFeedback(id, adminFeedbackDTO);
    }
    @PutMapping("/del/{id}")
    public AdminFeedbackDTO updateFeedback(@PathVariable Long id, @RequestBody AdminFeedbackDTO adminFeedbackDTO) {
        return adminFeedbackService.updateFeedback(id, adminFeedbackDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAdminFeedback(@PathVariable Long id) {
        adminFeedbackService.deleteAdminFeedback(id);
    }

    @GetMapping
    public List<AdminFeedbackDTO> getAllAdminFeedback() {
        return adminFeedbackService.getAllAdminFeedback();
    }

    @GetMapping("/detailed-feedback")
    public List<UserFeedbackDTO> getAllDetailedFeedback() {
        return adminFeedbackService.getDetailedFeedback();
    }
}
