package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Automatically send advice based on user BMI
    @PostMapping("/send/{chdr_id}")
    public ResponseEntity<String> sendAdviceNotification(@PathVariable String chdr_id) {
        String message = notificationService.sendAdviceNotification(chdr_id);
        return ResponseEntity.ok(message);  // Returning 200 OK with message
    }
}
