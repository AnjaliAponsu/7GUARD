package com.example.GuardBackend.DTO;

import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class DoctorDTO {

    @NotNull
    private Integer d_id;
    private String docFullName;
    private String d_nic;
    private String d_mobileNumber;
    private String d_workNumber;
    private String d_personalEmail;
    private String d_password;
    private String doctorWorkEmail;
    private String d_gender;
    private String d_department;
    private String d_licenseNumber;
    private String d_specialization;
    private LocalDate d_dob;
    private String d_address;
    private String d_country;
    private String d_province;
    private String d_city;
    private Integer d_postalCode;
    private LocalDate d_jobStartDate;
    private String d_status;
    private String newPassword;
    private String confirmPassword;

}
