package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Getter
@Setter
@Table(name = "bmi")
public class Bmi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bmi_id")
    private Integer bmiId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "chdr_id", referencedColumnName = "chdr_id", nullable = false)
    private CHDR chdr;

    @Column(name = "child_weight", nullable = false)
    private Double childWeight;

    @Column(name = "child_height", nullable = false)
    private Double childHeight;

    @Column(name = "bmi_value", nullable = false)
    private Double bmiValue;

    @Column(name = "bmi_status")
    private String bmiStatus;

    @Column(name = "date")
    private LocalDate date;

    public void calculateBmi() {
        if (childHeight != null && childWeight != null && childHeight > 0) {
            double heightInMeters = childHeight / 100.0;
            this.bmiValue = childWeight / (childHeight * childHeight);
            this.date = LocalDate.now();

            LocalDate dob = this.chdr.getDob();
            int age = calculateAge(dob);

            if (age < 2) {
                this.bmiStatus = getBmiCategoryForAgeBelow2(this.bmiValue);
            } else if (age >= 2 && age <= 5) {
                this.bmiStatus = getBmiCategoryForAge2To5(this.bmiValue);
            } else if (age > 5 && age <= 12) {
                this.bmiStatus = getBmiCategoryForAge6To12(this.bmiValue);
            } else {
                this.bmiStatus = "Invalid age";
            }

        }
    }

    private int calculateAge(LocalDate dob) {
        LocalDate today = LocalDate.now();
        return Period.between(dob, today).getYears();
    }

    private String getBmiCategoryForAgeBelow2(Double bmiValue) {
        if (bmiValue > 18) {
            return "Obese";
        } else if (bmiValue > 16) {
            return "Overweight";
        } else if (bmiValue >= 15) {
            return "Normal";
        } else if (bmiValue >= 13) {
            return "Mildly Underweight";
        } else if (bmiValue >= 11) {
            return "Moderately Underweight";
        } else {
            return "Severely Underweight";
        }
    }

    private String getBmiCategoryForAge2To5(Double bmiValue) {
        if (bmiValue > 17) {
            return "Obese";
        } else if (bmiValue > 15) {
            return "Overweight";
        } else if (bmiValue >= 14) {
            return "Normal";
        } else if (bmiValue >= 12) {
            return "Mildly Underweight";
        } else if (bmiValue >= 10) {
            return "Moderately Underweight";
        } else {
            return "Severely Underweight";
        }
    }

    private String getBmiCategoryForAge6To12(Double bmiValue) {
        if (bmiValue > 20) {
            return "Obese";
        } else if (bmiValue > 18) {
            return "Overweight";
        } else if (bmiValue >= 16) {
            return "Normal";
        } else if (bmiValue >= 14) {
            return "Mildly Underweight";
        } else if (bmiValue >= 12) {
            return "Moderately Underweight";
        } else {
            return "Severely Underweight";
        }
    }

}
