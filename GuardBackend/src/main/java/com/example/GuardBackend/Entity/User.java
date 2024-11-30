package com.example.GuardBackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @Column(name = "chdr_id")
    private String chdr_id;
    @Column(name="height")
    private double height;
    @Column(name="weight")
    private double weight;
    @Column(name="date")
    private String date;
    @Column(name = "bmi")
    private double bmi;
    @Column(name= "age")
    private int age;
}
