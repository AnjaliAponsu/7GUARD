//package com.example.GuardBackend.ServiceImplementation;
//
//import com.example.GuardBackend.DTO.FeedbackDTO;
//import com.example.GuardBackend.Entity.Feedback;
//import com.example.GuardBackend.Repository.FeedbackRepository;
//import com.example.GuardBackend.Service.FeedbackService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Collections;
//import java.util.List;
//
//
//
//    @Service
//    class FeedbackServiceImpl  {
//
//        @Autowired
//        private FeedbackRepository feedbackRepository;
//        private Object feedback;
//
//        FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
//            super();
//            this.feedbackRepository = feedbackRepository;
//        }
//
//        @Override
//        public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO){
//            Feedback feedback = new Feedback();
//            feedback.setChannelingNo(feedbackDTO.getChannelingNo());
//            feedback.setName(feedbackDTO.getName());
//            feedback.setDate(feedbackDTO.getDate());
//            feedback.setTime(feedbackDTO.getTime());
//            feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
//
//            return feedbackDTO;
//
//        }
//
//        @Override
//        public FeedbackDTO getFeedbackById(Long id){
//            Feedback feedback = feedbackRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new RuntimeException("Feedback Not Found"));
//            FeedbackDTO feedbackDTO = new FeedbackDTO();
//            //feedbackDTO.setId(FeedbackDTO.getId());
//            feedback.setChannelingNo(feedbackDTO.getChannelingNo());
//            feedback.setName(feedbackDTO.getName());
//            feedback.setDate(feedbackDTO.getDate());
//            feedback.setTime(feedbackDTO.getTime());
//            feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
//            return feedbackDTO;
//        }
//
//        @Override
//        public List<Feedback> getAllFeedbacks(){
//
//            return Collections.unmodifiableList(feedbackDTO);
//        }
//
//        //void collect(Collector.toList());
//
//        @Override
//        public FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO){
//            Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback Not Found"));
//            feedback.setChannelingNo(feedbackDTO.getChannelingNo());
//            feedback.setName(feedbackDTO.getName());
//            feedback.setDate(feedbackDTO.getDate());
//            feedback.setTime(feedbackDTO.getTime());
//            feedback.setFeedbackComment(feedbackDTO.getFeedbackComment());
//            feedback = feedbackRepository.save(feedback);
//            //feedbackDTO.setId(feedbackDTO.getId());
//            return feedbackDTO;
//        }
//        @Override
//        public void deleteFeedback(Long id){
//            feedbackRepository.deleteById(id);
//        }
//    }
//
//
