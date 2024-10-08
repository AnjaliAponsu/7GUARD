package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.lang.model.element.Name;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (name = "channeling_no")
    private  String channelingNo;
    private  String name;
    private  String date;
    private  String time;
    @Column(name = "feedback_comment")
    private  String feedbackComment;





    //Getters and setters
}
