package com.example.GuardBackend.DTO;

import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class StaffDTO {
    @NotNull
    private Integer s_id;

    @NotNull
    private String s_fName;

    @NotNull
    private String s_lName;

    @NotNull
    private String s_nic;

    @NotNull
    private String s_mobileNumber;

    @NotNull
    private String s_workNumber;

    @NotNull
    private String s_personalEmail;

    @NotNull
    private String s_password;

    @NotNull
    private String workEmail;

    @NotNull
    private String s_gender;

    @NotNull
    private String s_department;

    @NotNull
    private String s_jobTitle;

    @NotNull
    private LocalDate s_dob;

    @NotNull
    private String s_address;

    @NotNull
    private String s_country;

    @NotNull
    private String s_province;

    @NotNull
    private String s_city;

    @NotNull
    private Integer s_postalCode;

    @NotNull
    private LocalDate s_jobStartDate;

    @NotNull
    private String s_status;

    private String newPassword;
    private String confirmPassword;

}
