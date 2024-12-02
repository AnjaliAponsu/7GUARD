package com.Feedback.User.Admin.Feedback.User.Admin.Controller;

import com.Feedback.User.Admin.Feedback.User.Admin.DTO.UserFeedbackDTO;
import com.Feedback.User.Admin.Feedback.User.Admin.Service.UserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class UserFeedbackController {

    @Autowired
    private UserFeedbackService userFeedbackService;

    @PostMapping
    public ResponseEntity<UserFeedbackDTO> createFeedback(@RequestBody UserFeedbackDTO userfeedbackDTO) {
        UserFeedbackDTO createdFeedback = userFeedbackService.createFeedback(userfeedbackDTO);
        return ResponseEntity.ok(createdFeedback);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserFeedbackDTO> updateFeedback(@PathVariable Long id, @RequestBody UserFeedbackDTO userfeedbackDTO) {
        UserFeedbackDTO updatedFeedback = userFeedbackService.updateFeedback(id, userfeedbackDTO);
        return ResponseEntity.ok(updatedFeedback);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        userFeedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserFeedbackDTO>> getAllFeedback() {
        List<UserFeedbackDTO> feedbackList = userFeedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbackList);
    }
}
