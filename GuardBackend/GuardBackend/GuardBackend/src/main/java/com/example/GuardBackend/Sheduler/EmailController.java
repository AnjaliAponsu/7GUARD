package com.example.GuardBackend.Sheduler;

import com.example.GuardBackend.Entity.Reminder;
import com.example.GuardBackend.Repository.ReminderRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;


@RestController
public class EmailController {

    private final JavaMailSender mailSender;
    private final ReminderRepository reminderRepository;


    public EmailController(JavaMailSender mailSender, ReminderRepository reminderRepository) {
        this.mailSender = mailSender;
        this.reminderRepository= reminderRepository ;
    }

    @PostMapping("/send-email/{id}")
    public String sendEmail(@PathVariable("id") Long id) {
        try {

            Optional<Reminder> reminderOptional =  reminderRepository.findById(id);

            if (reminderOptional.isPresent()) {
                Reminder reminder = reminderOptional.get();


                String userEmail = reminder.getEmail();

                if (userEmail == null || userEmail.isEmpty()) {
                    return "Email address not found for CHDR ID: ";
                }


                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("bandarapathum123@gmail.com");
                message.setTo(userEmail);
                message.setSubject("Email From Santa Dora Hospital");

                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


                message.setText("Santa Dora Hospital, \n\nThis is a reminder for your Next vaccine: "
                        + reminder.getNext()
                        +".\n\n Vaccine Date is - "
                        +reminder.getReminderDate()
                        + ".\n\nSent on: "
                        + formattedDateTime);

                // Send the email
                mailSender.send(message);

                reminder.setStatus("Done");
                Reminder savereminder = reminderRepository.save(reminder);

                return "Email sent successfully to: " + userEmail;
            } else {
                return "No user found with CHDR ID: ";
            }
        } catch (Exception e) {
            return "Error while sending email: " + e.getMessage();
        }
    }
}