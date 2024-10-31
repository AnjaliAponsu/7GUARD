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
    private int feedBackId;
    @Column (name = "CHANNELING_NO")
    private  String channelingNo;
    @Column(name = "NAME")
    private  String name;
    @Column (name = "date")
    private  String date;
    @Column (name ="time")
    private  String time;
    @Column(name = "feedback_comment")
    private  String feedbackComment;





    //Getters and setters
}
