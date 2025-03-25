package com.example.GuardBackend.Entity;

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
    private String Name;
    private Long channelingNo;
    private String phoneNumber;
    private String feedbackComment;
    private String reply;

    // Getters and Setters
}
