package com.example.GuardBackend.DTO;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParentOtpDTO {

    private Integer otpId;
    private  String parentNic;
    private  String otp;
    private Integer loginCount;
    private String newPassword;
    private String confirmPassword;
}
