package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Entity.Feedback;
import com.example.GuardBackend.Repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;




    public Feedback createFeedback(Feedback feedbackDTO) {
        return feedbackRepository.save(feedbackDTO);
    }


    public Feedback getFeedbackById(int id) {

        return feedbackRepository.findById(id).orElse(null);
    }

    public List<Feedback> getAllFeedbacks() {

        return feedbackRepository.findAll();

    }




    public boolean delete(int id){
        return feedbackRepository.deleteById(id);
    }

    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> findsall() {
        return feedbackRepository.findAll();
    }

    public Feedback captureById(int id) {
        return feedbackRepository.findById(id).orElse(null);
    }
}

