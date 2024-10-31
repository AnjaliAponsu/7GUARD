package com.example.GuardBackend.DTO;


import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class FeedbackDTO {

    private int feedbackId;
    private String channelingNo;
    private String name;
    private String date;
    private String time;
    private String feedbackComment;




    //Getters and Setters
}
