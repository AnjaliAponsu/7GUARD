package com.example.GuardBackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @Column(name = "chdr_id")
    private String chdr_id;

    @Column(name = "height")
    private double height; // in meters

    @Column(name = "weight")
    private double weight; // in kilograms

    @Column(name = "dob")
    private LocalDate dob; // Date of birth

    /**
     * Calculate BMI based on weight and height.
     * @return BMI value.
     */
    public double getBmi() {
        if (height > 0) {
            return weight / (height * height);
        }
        throw new IllegalArgumentException("Height must be greater than 0");
    }

    /**
     * Calculate age based on date of birth.
     * @return Age in years.
     */
    public int getAge() {
        if (dob != null) {
            return Period.between(dob, LocalDate.now()).getYears();
        }
        throw new IllegalArgumentException("Date of birth is null");
    }
}
