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
@Table(name="Feedback")
public class FeedbackDTO {

    private Long id;
    private String channelingNo;
    private String name;
    private String date;
    private String time;
    private String feedbackComment;
    private Long id1;



    //Getters and Setters
}
