package com.example.GuardBackend.ServiceImplementation;

// AdminFeedbackService.java
import com.example.GuardBackend.DTO.AdminFeedbackDTO;
import com.example.GuardBackend.DTO.UserFeedbackDTO;

import java.util.List;

public interface AdminFeedbackService {
    AdminFeedbackDTO saveAdminFeedback(AdminFeedbackDTO adminFeedbackDTO);
    AdminFeedbackDTO updateAdminFeedback(Long id, AdminFeedbackDTO adminFeedbackDTO);
    void deleteAdminFeedback(Long id);
    List<AdminFeedbackDTO> getAllAdminFeedback();
    AdminFeedbackDTO getAdminFeedbackById(Long id);
    List<UserFeedbackDTO> getDetailedFeedback();
    AdminFeedbackDTO updateFeedback(Long id, AdminFeedbackDTO adminFeedbackDTO);
}

