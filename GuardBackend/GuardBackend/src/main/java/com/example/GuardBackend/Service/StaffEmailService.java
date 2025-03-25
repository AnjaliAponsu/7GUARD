package com.example.GuardBackend.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class StaffEmailService {
    @Autowired
    private JavaMailSender javaMailSender;


    public void sendStaffEmailService(String workEmail, String s_password){
        try{
            sendDoctorEmail(workEmail, s_password);
        }
        catch (MessagingException e){
            throw new RuntimeException("Unable to send Login details");
        }
    }

    private void sendDoctorEmail(String workEmail, String s_password) throws MessagingException{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(workEmail);
        mimeMessageHelper.setSubject("Login Details");
        mimeMessageHelper.setText("You are successfully registered to 7Guard. Your User Name is " + workEmail +" and use this " + s_password + " as your Password");
        javaMailSender.send(mimeMessage);
    }
}
