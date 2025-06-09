package com.example.GuardBackend.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ChildDTO {
    private Integer child_id;
    private String parentNic;
    private String c_fName;
    private String c_lName;
    private LocalDate c_dob;
    private String c_gender;
    private String relationshipToGuardian;
    private String c_bloodGroup;
    private String c_allergies;
    private String c_medicalCondition;
    private String assignDoctor;
}
