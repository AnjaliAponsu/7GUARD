package com.example.GuardBackend.DTO;

import lombok.Data;

@Data
public class UserFeedbackDTO {
    private Long id;
    private String name;
    private Long channelingNo;
    private String phoneNumber;
    private String evaluation;
    private String feedbackComment;

    // Getters and Setters
}
