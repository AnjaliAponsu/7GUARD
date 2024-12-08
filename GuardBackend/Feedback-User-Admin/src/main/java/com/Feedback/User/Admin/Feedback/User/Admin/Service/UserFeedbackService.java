package com.Feedback.User.Admin.Feedback.User.Admin.Service;

import com.Feedback.User.Admin.Feedback.User.Admin.DTO.UserFeedbackDTO;

import java.util.List;

public interface UserFeedbackService {
    UserFeedbackDTO createFeedback(UserFeedbackDTO userfeedbackDTO);
    UserFeedbackDTO updateFeedback(Long id, UserFeedbackDTO userFeedbackDTO);
    void deleteFeedback(Long id);
    List<UserFeedbackDTO> getAllFeedback();
}
