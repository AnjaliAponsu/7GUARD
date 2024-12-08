package com.Feedback.User.Admin.Feedback.User.Admin.Service.AdminFeedbackServiceImpl;

// AdminFeedbackServiceImpl.java
import java.util.List;
import java.util.stream.Collectors;

import com.Feedback.User.Admin.Feedback.User.Admin.DTO.AdminFeedbackDTO;
import com.Feedback.User.Admin.Feedback.User.Admin.Entity.AdminFeedback;
import com.Feedback.User.Admin.Feedback.User.Admin.Repositry.AdminFeedbackRepository;
import com.Feedback.User.Admin.Feedback.User.Admin.Service.AdminFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminFeedbackServiceImpl implements AdminFeedbackService {

    @Autowired
    private AdminFeedbackRepository adminFeedbackRepository;

    @Override
    public AdminFeedbackDTO saveAdminFeedback(AdminFeedbackDTO adminFeedbackDTO) {
        AdminFeedback adminFeedback = new AdminFeedback();
        adminFeedback.setAdminName(adminFeedbackDTO.getAdminName());
        adminFeedback.setPhoneNumber(adminFeedbackDTO.getPhoneNumber());
        adminFeedback.setFeedbackComment(adminFeedbackDTO.getFeedbackComment());
        adminFeedback.setReply(adminFeedbackDTO.getReply());

        adminFeedback = adminFeedbackRepository.save(adminFeedback);

        adminFeedbackDTO.setId(adminFeedback.getId);
        return adminFeedbackDTO;
    }

    @Override
    public AdminFeedbackDTO updateAdminFeedback(Long id, AdminFeedbackDTO adminFeedbackDTO) {
        AdminFeedback adminFeedback = adminFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));

        adminFeedback.setAdminName(adminFeedbackDTO.getAdminName());
        adminFeedback.setPhoneNumber(adminFeedbackDTO.getPhoneNumber());
        adminFeedback.setFeedbackComment(adminFeedbackDTO.getFeedbackComment());
        adminFeedback.setReply(adminFeedbackDTO.getReply());

        adminFeedback = adminFeedbackRepository.save(adminFeedback);

        adminFeedbackDTO.setId(adminFeedback.getId());
        return adminFeedbackDTO;
    }

    @Override
    public void deleteAdminFeedback(Long id) {
        adminFeedbackRepository.deleteById(id);
    }

    @Override
    public List<AdminFeedbackDTO> getAllAdminFeedback() {
        return adminFeedbackRepository.findAll().stream().map(adminFeedback -> {
            AdminFeedbackDTO adminFeedbackDTO = new AdminFeedbackDTO();
            adminFeedbackDTO.setId(adminFeedback.getId());
            adminFeedbackDTO.setAdminName(adminFeedback.getAdminName());
            adminFeedbackDTO.setPhoneNumber(adminFeedback.getPhoneNumber());
            adminFeedbackDTO.setFeedbackComment(adminFeedback.getFeedbackComment());
            adminFeedbackDTO.setReply(adminFeedback.getReply());
            return adminFeedbackDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public AdminFeedbackDTO getAdminFeedbackById(Long id) {
        AdminFeedback adminFeedback = adminFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        AdminFeedbackDTO adminFeedbackDTO = new AdminFeedbackDTO();
        adminFeedbackDTO.setId(adminFeedback.getId);
        adminFeedbackDTO.setAdminName(adminFeedback.getAdminName());
        adminFeedbackDTO.setPhoneNumber(adminFeedback.getPhoneNumber());
        adminFeedbackDTO.setFeedbackComment(adminFeedback.getFeedbackComment());
        adminFeedbackDTO.setReply(adminFeedback.getReply());
        return adminFeedbackDTO;
    }
}

