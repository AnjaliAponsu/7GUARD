package Controller;

import com.example.GuardBackend.DTO.FeedbackDTO;
import com.example.GuardBackend.Entity.Feedback;
import com.example.GuardBackend.Service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.cert.CertPathBuilderResult;

@CrossOrigin
@RestController
@RequestMapping("api/v1/feedbacks")
public class FeedbackControl {
    @Autowired
    private IFeedbackService feedbackService;

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

    @GetMapping("/get")
    public FeedbackDTO feedbackDTO(Long id){
        return feedbackService.getFeedbackById(id);
    }
////    public ResponseEntity<FeedbackDTO>getFeedbackById(@PathVariable Long id){
////        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
//    }

//    @GetMapping("//allGet")
//    public ResponseEntity<FeedbackDTO>getFeedbackById(@PathVariable Long id){
//        return responseEntity.ok (feedbackService.getFeedbackById(id));
//    }
    @GetMapping("/allGet")
    public FeedbackDTO getAll(Long id){
        return feedbackService.getFeedbackById(id);
    }

    @PutMapping("/put")
    public FeedbackDTO updateFeedback(@PathVariable Long id,@RequestBody FeedbackDTO feedbackDTO){
        Feedback feedback = new Feedback();
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        feedback.setId(feedbackDTO.getId());
        feedback.setName(feedbackDTO.getName());
        feedback.setDate(feedbackDTO.getDate());
        feedback.setTime(feedbackDTO.getTime());
        feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
        return feedbackService.updateFeedback(feedback);
    }


}


