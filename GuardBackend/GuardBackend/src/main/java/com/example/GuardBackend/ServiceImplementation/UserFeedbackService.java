package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.UserFeedbackDTO;
import java.util.List;

public interface UserFeedbackService {
    UserFeedbackDTO createFeedback(UserFeedbackDTO userfeedbackDTO);
    UserFeedbackDTO updateFeedback(Long id, UserFeedbackDTO userFeedbackDTO);
    void deleteFeedback(Long id);
    List<UserFeedbackDTO> getAllFeedback();

    List<UserFeedbackDTO> getFeedbackWithAdminAnswers();
}
