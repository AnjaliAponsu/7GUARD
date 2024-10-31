package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Entity.Feedback;

import java.security.cert.CertPathBuilder;
import java.util.List;

public interface IFeedbackService {
    public Feedback createFeedback(Feedback feedbackDTO);
    FeedbackDTO getFeedbackById(Long id);

    List<Feedback> getAllFeedbacks();
    FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO);
    void deleteFeedback(Long id);

    CertPathBuilder noContent();

    FeedbackDTO updateFeedback(Feedback feedback);
}
