package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Entity.Feedback;
import com.example.GuardBackend.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("api/v1/feedbacks")
public class FeedbackControl {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/add")
    public Feedback createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        feedback.setName(feedbackDTO.getName());
        feedback.setDate(feedbackDTO.getDate());
        feedback.setTime(feedbackDTO.getTime());
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        return feedbackService.createFeedback(feedback);
    }

//    @GetMapping("/get")
//    public Optional<Feedback> feedbackDTO(Long id){
//        return feedbackService.getFeedbackById(Math.toIntExact(id));
//    }
////    public ResponseEntity<FeedbackDTO>getFeedbackById(@PathVariable Long id){
////        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
//    }
//
//    @GetMapping("//allGet")
//    public ResponseEntity<FeedbackDTO>getFeedbackById(@PathVariable Long id){
//        return responseEntity.ok (feedbackService.getFeedbackById(id));
//    }


    @PutMapping("/put")
    public Feedback updateFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        feedback.setFeedBackId(feedbackDTO.getFeedbackId());
        feedback.setName(feedbackDTO.getName());
        feedback.setDate(feedbackDTO.getDate());
        feedback.setTime(feedbackDTO.getTime());
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        return feedbackService.updateFeedback(feedback);
    }
    @GetMapping("get")
    public List<Feedback> getAlls(){
        return feedbackService.findsall();
    }
    @GetMapping("get/{id}")
    public Feedback getById(@PathVariable int id){
        return feedbackService.captureById(id);
    }



}


