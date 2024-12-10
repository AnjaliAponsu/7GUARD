package com.Feedback.User.Admin.Feedback.User.Admin.Service.UserFeedbackServiceImpl;

import com.Feedback.User.Admin.Feedback.User.Admin.DTO.UserFeedbackDTO;
import com.Feedback.User.Admin.Feedback.User.Admin.Entity.UserFeedback;
import com.Feedback.User.Admin.Feedback.User.Admin.Repositry.UserFeedbackRepository;
import com.Feedback.User.Admin.Feedback.User.Admin.Service.UserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserFeedbackServiceImpl implements UserFeedbackService {

        @Autowired
        private UserFeedbackRepository userfeedbackRepository;

        @Override
        public UserFeedbackDTO createFeedback(UserFeedbackDTO userfeedbackDTO) {
            UserFeedback userfeedback = new UserFeedback();
            userfeedback.setName(userfeedbackDTO.getName());
            userfeedback.setChannelingNo(userfeedbackDTO.getChannelingNo());
            userfeedback.setPhoneNumber(userfeedbackDTO.getPhoneNumber());
            userfeedback.setEvaluation(userfeedbackDTO.getEvaluation());
            userfeedback.setFeedbackComment(userfeedbackDTO.getFeedbackComment());

            userfeedback = userfeedbackRepository.save(userfeedback);
            return convertEntityToDTO(userfeedback);
        }

        @Override
        public UserFeedbackDTO updateFeedback(Long id, UserFeedbackDTO userfeedbackDTO) {
            UserFeedback userfeedback = userfeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
            userfeedback.setName(userfeedbackDTO.getName());
            userfeedback.setChannelingNo(userfeedbackDTO.getChannelingNo());
            userfeedback.setPhoneNumber(userfeedbackDTO.getPhoneNumber());
            userfeedback.setEvaluation(userfeedbackDTO.getEvaluation());
            userfeedback.setFeedbackComment(userfeedbackDTO.getFeedbackComment());

            userfeedback = userfeedbackRepository.save(userfeedback);
            return convertEntityToDTO(userfeedback);
        }

        @Override
        public void deleteFeedback(Long id) {
            userfeedbackRepository.deleteById(id);
        }

        @Override
        public List<UserFeedbackDTO> getAllFeedback() {
            return userfeedbackRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
        }

    @Override
    public List<UserFeedbackDTO> getFeedbackWithAdminAnswers() {
        return List.of();
    }

    private UserFeedbackDTO convertEntityToDTO(UserFeedback userfeedback) {
            UserFeedbackDTO userfeedbackDTO = new UserFeedbackDTO();
            userfeedbackDTO.setId(userfeedback.getId());
            userfeedbackDTO.setName(userfeedback.getName());
            userfeedbackDTO.setChannelingNo(userfeedback.getChannelingNo());
            userfeedbackDTO.setPhoneNumber(userfeedback.getPhoneNumber());
            userfeedbackDTO.setEvaluation(userfeedback.getEvaluation());
            userfeedbackDTO.setFeedbackComment(userfeedback.getFeedbackComment());
            return userfeedbackDTO;
        }
    }


