package com.example.GuardBackend.DTO;

import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParentDTO {

    private Integer parent_id;

    @NotNull
    private String parentNic;
    private String p_fName;
    private String p_lName;
    private String p_mobileNumber;
    private String p_email;
    private String p_gender;
    private LocalDate p_dob;
    private String p_address;
    private String p_country;
    private String p_province;
    private String p_city;
    private Integer p_postalCode;
    private String p_relationship;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String emergencyContactRelation;


}
