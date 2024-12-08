package com.Feedback.User.Admin.Feedback.User.Admin.Service;

// AdminFeedbackService.java
import com.Feedback.User.Admin.Feedback.User.Admin.DTO.AdminFeedbackDTO;

import java.util.List;

public interface AdminFeedbackService {
    AdminFeedbackDTO saveAdminFeedback(AdminFeedbackDTO adminFeedbackDTO);
    AdminFeedbackDTO updateAdminFeedback(Long id, AdminFeedbackDTO adminFeedbackDTO);
    void deleteAdminFeedback(Long id);
    List<AdminFeedbackDTO> getAllAdminFeedback();
    AdminFeedbackDTO getAdminFeedbackById(Long id);
}

