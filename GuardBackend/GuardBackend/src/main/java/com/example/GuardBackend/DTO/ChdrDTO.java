package com.example.GuardBackend.DTO;

import lombok.*;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ChdrDTO {
    private Integer chdrId;
    private Integer childId;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String bloodGroup;
    private String allergies;
    private String assignDoctor;
    private String medicalCondition;
    private String parentNic;
    private String email;
}
