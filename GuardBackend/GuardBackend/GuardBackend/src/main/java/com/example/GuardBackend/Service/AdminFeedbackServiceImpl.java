package com.example.GuardBackend.Service;

// AdminFeedbackServiceImpl.java
import java.util.List;
import java.util.stream.Collectors;
import com.example.GuardBackend.DTO.AdminFeedbackDTO;
import com.example.GuardBackend.DTO.UserFeedbackDTO;
import com.example.GuardBackend.Entity.AdminFeedback;
import com.example.GuardBackend.Repository.AdminFeedbackRepository;
import com.example.GuardBackend.ServiceImplementation.AdminFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminFeedbackServiceImpl implements AdminFeedbackService {

    @Autowired
    private AdminFeedbackRepository adminFeedbackRepository;

    @Autowired
    private FeedbackEmailService feedbackEmailService;

    @Override
    public AdminFeedbackDTO saveAdminFeedback(AdminFeedbackDTO adminFeedbackDTO) {
        AdminFeedback adminFeedback = new AdminFeedback();
        adminFeedback.setName(adminFeedbackDTO.getAdminName());
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

        adminFeedback.setName(adminFeedbackDTO.getAdminName());
        adminFeedback.setPhoneNumber(adminFeedbackDTO.getPhoneNumber());
        adminFeedback.setFeedbackComment(adminFeedbackDTO.getFeedbackComment());
        adminFeedback.setReply(adminFeedbackDTO.getReply());

        adminFeedback = adminFeedbackRepository.save(adminFeedback);

        adminFeedbackDTO.setId(adminFeedback.getId());
        feedbackEmailService.sendFeedbackEmailService(adminFeedback.getPhoneNumber(), adminFeedback.getReply(), adminFeedback.getFeedbackComment());
        return adminFeedbackDTO;
    }
@Override
    public AdminFeedbackDTO updateFeedback(Long id, AdminFeedbackDTO adminFeedbackDTO) {
        AdminFeedback adminFeedback = adminFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));

        adminFeedback.setName(adminFeedbackDTO.getAdminName());
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
            adminFeedbackDTO.setChannelingNo(adminFeedback.getChannelingNo());
            adminFeedbackDTO.setAdminName(adminFeedback.getName());
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
        adminFeedbackDTO.setAdminName(adminFeedback.getName());
        adminFeedbackDTO.setPhoneNumber(adminFeedback.getPhoneNumber());
        adminFeedbackDTO.setFeedbackComment(adminFeedback.getFeedbackComment());
        adminFeedbackDTO.setReply(adminFeedback.getReply());
        return adminFeedbackDTO;
    }

    @Override
    public List<UserFeedbackDTO> getDetailedFeedback() {
        return List.of();
    }
}

