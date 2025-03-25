package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "advice")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Advice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "bmi_status")
    private String bmiStatus;

    @Column(name = "message")
    private String message;


}
