package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Parent;
import com.example.GuardBackend.Entity.ParentOTP;
import com.example.GuardBackend.Repository.ParentOtpRepo;
import com.example.GuardBackend.Repository.ParentRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Optional;

@Service
public class OtpService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private ParentOtpRepo parentOtpRepo;

    @Autowired
    private ParentRepo parentRepo;

    public void sendOtpService(String email, String parentNic) {
        String otp = generateOtp();
        try{
            sendOtpMail(email, otp);
            saveOtp(parentNic, otp);
        }
        catch (MessagingException e){
            throw new RuntimeException("Unable to send OTP");
        }
    }

    private String generateOtp(){
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendOtpMail(String email, String otp) throws MessagingException{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Login Details");
        mimeMessageHelper.setText("You are successfully registered to 7Guard Vaccination System. Use this OTP " + otp + " and use your NIC as User Name");
        javaMailSender.send(mimeMessage);
    }

    private void saveOtp(String parentNic, String otp) {
        Optional<Parent> parentOptional = parentRepo.findByParentNic(parentNic);
        Parent parent = parentOptional.orElseThrow(() -> new RuntimeException("Parent with NIC " + parentNic + " not found"));

        ParentOTP parentOTP = new ParentOTP();
        parentOTP.setParent(parent);
        parentOTP.setOtp(otp);
        parentOTP.setLoginCount(0);

        parentOtpRepo.save(parentOTP);
    }
}
