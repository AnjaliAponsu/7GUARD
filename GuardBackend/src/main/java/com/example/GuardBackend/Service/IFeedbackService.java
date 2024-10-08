package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.FeedbackDTO;

import java.util.List;

public interface IFeedbackService {
    FeedbackDTO createFeedback(FeedbackDTO feedbackDTO);
    FeedbackDTO getFeedbackById(Long id);

    List<FeedbackDTO> getAllFeedbacks();
    FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO);
    void deleteFeedback(Long id);
}
