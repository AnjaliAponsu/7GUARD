package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void sendAdviceNotification(String chdr_id) {
        User user = userService.getUserById(chdr_id).orElseThrow();
        String category;

        // Determine BMI category
        if (user.getBmi() < 18.5) {
            category = "Underweight";
        } else if (user.getBmi() < 25.0) {
            category = "Normal";
        } else if (user.getBmi() < 30.0) {
            category = "Overweight";
        } else {
            category = "Obese";
        }

        // Get advice by category
        List<Advice> advices = adviceService.getAdviceByCategory(category);

        // Simulate sending notification
        for (Advice advice : advices) {
            System.out.println("Sending advice to user " + chdr_id + ": " + advice.getMessage());
        }
    }
}
