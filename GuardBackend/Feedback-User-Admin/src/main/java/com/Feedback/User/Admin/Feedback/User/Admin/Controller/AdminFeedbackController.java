package com.Feedback.User.Admin.Feedback.User.Admin.Controller;

import com.Feedback.User.Admin.Feedback.User.Admin.DTO.AdminFeedbackDTO;
import com.Feedback.User.Admin.Feedback.User.Admin.DTO.UserFeedbackDTO;
import com.Feedback.User.Admin.Feedback.User.Admin.Service.AdminFeedbackService;
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
