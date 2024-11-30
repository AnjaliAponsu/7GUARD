package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class NotificationService {

    private final UserService userService;
    private final AdviceService adviceService;

    @Autowired
    public NotificationService(UserService userService, AdviceService adviceService) {
        this.userService = userService;
        this.adviceService = adviceService;
    }

    public String sendAdviceNotification(String chdr_id) {
        User user = userService.getUserById(chdr_id).orElseThrow();

        // Calculate user's age
        int age = calculateAge(user.getDob());

        // Determine BMI category based on age
        String bmiCategory;
        if (age < 2) {
            bmiCategory = getBmiCategoryForAgeBelow2(user.getBmi());
        } else if (age >= 2 && age <= 5) {
            bmiCategory = getBmiCategoryForAge2To5(user.getBmi());
        } else {
            bmiCategory = "Age out of range";
        }

        if ("Age out of range".equals(bmiCategory)) {
            return "No advice available for users outside the age range of 0-5 years.";
        }

        // Get advice by BMI category
        List<Advice> advices = adviceService.getAdviceByCategory(bmiCategory);

        // Simulate sending notification
        for (Advice advice : advices) {
            System.out.println("Sending advice to user " + chdr_id + ": " + advice.getMessage());
        }

        return "Notification sent successfully to user with chdr_id: " + chdr_id;
    }

    private int calculateAge(LocalDate dob) {
        LocalDate today = LocalDate.now();
        return Period.between(dob, today).getYears();
    }

    private String getBmiCategoryForAgeBelow2(Double bmiValue) {
        if (bmiValue > 18) {
            return "Obese";
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
}
