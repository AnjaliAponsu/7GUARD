package com.example.GuardBackend.Service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class FeedbackEmailService {
    @Autowired
    private JavaMailSender javaMailSender;


    public void sendFeedbackEmailService(String phonenumber, String reply,String comment){
        try{
            sendFeedbackEmail(phonenumber, reply,comment);
        }
        catch (MessagingException e){
            throw new RuntimeException("Unable to send  details");
        }
    }

    private void sendFeedbackEmail(String phonenumber, String reply,String comment) throws MessagingException{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(phonenumber);
        mimeMessageHelper.setSubject("Review Details");
        mimeMessageHelper.setText("For your review: "+comment+"\n"+"\n"+"Reply is: " + reply);
        javaMailSender.send(mimeMessage);
    }
}