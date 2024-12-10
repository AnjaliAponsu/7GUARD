package com.Feedback.User.Admin.Feedback.User.Admin.DTO;

import lombok.Data;

@Data
public class UserFeedbackDTO {
    private Long id;
    private String name;
    private String channelingNo;
    private String phoneNumber;
    private String evaluation;
    private String feedbackComment;

    // Getters and Setters
}
