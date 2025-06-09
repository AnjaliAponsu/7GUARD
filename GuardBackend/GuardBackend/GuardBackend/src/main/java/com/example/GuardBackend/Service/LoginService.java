package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.ParentOtpDTO;
import com.example.GuardBackend.Entity.ParentOTP;
import com.example.GuardBackend.Repository.ParentOtpRepo;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Response.ParentLoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginService {
    @Autowired
    private ParentOtpRepo parentOtpRepo;

    public ParentLoginResponse loginParent(ParentOtpDTO parentOtpDTO) {
        ParentOTP parentOTP = parentOtpRepo.findByParent_ParentNic(parentOtpDTO.getParentNic());

        if (parentOTP != null) {

            String loginOtp = parentOtpDTO.getOtp();
            String otp = parentOTP.getOtp();

            boolean isPasswordRight = otp.equals(loginOtp);

            if (isPasswordRight) {
                parentOTP.setLoginCount(parentOTP.getLoginCount() + 1);
                parentOtpRepo.save(parentOTP);

                if(parentOTP.getLoginCount() == 1){
                    return new ParentLoginResponse("Please update your OTP to new Password", true, parentOTP.getLoginCount());
                }
                else{
                    return new ParentLoginResponse("Login Success", true, parentOTP.getLoginCount());
                }
            }else{
                return new ParentLoginResponse("Login failed. Check your User Name and Password", false, 0);
            }
}
        else{
            return new ParentLoginResponse("Login failed. Check your User Name and Password", false, 0);
        }

    }


    public ApiResponse updatePassword(ParentOtpDTO parentOtpDTO) {
        String newPassword = parentOtpDTO.getNewPassword();
        String confirmPassword = parentOtpDTO.getConfirmPassword();

        ParentOTP parentOTP = parentOtpRepo.findByParent_ParentNic(parentOtpDTO.getParentNic());

        if(parentOTP != null){
            if (newPassword == null || confirmPassword == null) {
                return new ApiResponse("New password and confirm password cannot be null.");
            }

            if(!newPassword.equals(confirmPassword)){
                return new ApiResponse("New password and confirm password do not match. Please try again.");
            }
            parentOTP.setOtp(newPassword);
            parentOtpRepo.save(parentOTP);
            return new ApiResponse("Password updated successfully. Please use the new password to log in.");
        }

        else{
            return new ApiResponse("Parent not found for given NIC");
        }

    }

}
