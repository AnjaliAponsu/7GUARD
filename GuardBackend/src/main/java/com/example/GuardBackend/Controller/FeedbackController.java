package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
    @Autowired
    private IFeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO){
        return ResponseEntity.ok(feedbackService.createFeedback(feedbackDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boolean> getFeedbackById(@PathVariable Long id){
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks(){
        return ResponseEntity.ok((List<FeedbackDTO>) (List<FeedbackDTO>) feedbackService.getAllFeedbacks());
    }

    @PutMapping("/id")
    public ResponseEntity<FeedbackDTO> updateFeedback(@PathVariable Long id,@RequestBody FeedbackDTO feedbackDTO){
        return ResponseEntity.ok(feedbackService.updateFeedback(id, feedbackDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id){
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }

}
