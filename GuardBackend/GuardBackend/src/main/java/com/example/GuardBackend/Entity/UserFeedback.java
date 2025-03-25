package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_feedback")
public class UserFeedback {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private Long channelingNo;
        private String phoneNumber;
        private String evaluation;
        private String feedbackComment;



        // Getters and Setters
}
