package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class FeedbackService implements IFeedbackService{
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Override
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        return feedbackRepository.findAll();
    }

    @Override
    public FeedbackDTO getFeedbackById(Long id) {
        return null;
    }

    @Override
    public List<FeedbackDTO> getAllFeedbacks() {
        return null;
    }

    @Override
    public FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO) {
        return null;
    }

    @Override
    public void deleteFeedback(Long id) {

    }
}
