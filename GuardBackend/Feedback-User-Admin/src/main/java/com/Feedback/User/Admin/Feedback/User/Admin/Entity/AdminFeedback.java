package com.Feedback.User.Admin.Feedback.User.Admin.Entity;

// AdminFeedback.java
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_feedback")
public class AdminFeedback {
    public Long getId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String adminName;
    private String phoneNumber;
    private String feedbackComment;
    private String reply;

    // Getters and Setters
}
