package com.example.GuardBackend.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class DoctorEmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendDoctorEmailService(String doctorWorkEmail, String d_password){
        try{
            sendDoctorEmail(doctorWorkEmail, d_password);
        }
        catch (MessagingException e){
            throw new RuntimeException("Unable to send Login details");
        }
    }

    private void sendDoctorEmail(String doctorWorkEmail, String d_password) throws MessagingException{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(doctorWorkEmail);
        mimeMessageHelper.setSubject("Login Details");
        mimeMessageHelper.setText("You are successfully registered to 7Guard Vaccination System. Your User Name is " + doctorWorkEmail +" and use this" + d_password + " as your Password");
        javaMailSender.send(mimeMessage);
    }
}
