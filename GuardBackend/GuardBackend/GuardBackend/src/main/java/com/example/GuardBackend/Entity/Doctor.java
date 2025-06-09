package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer d_id;

    @NotNull
    private String docFullName;

    @NotNull
    private String d_nic;

    @NotNull
    private String d_mobileNumber;

    @NotNull
    private String d_workNumber;

    @NotNull
    private String d_personalEmail;

    @NotNull
    private String d_password;

    @NotNull
    private String doctorWorkEmail;

    @NotNull
    private String d_gender;

    @NotNull
    private String d_department;

    @NotNull
    private String d_licenseNumber;

    @NotNull
    private String d_specialization;

    @NotNull
    private LocalDate d_dob;

    @NotNull
    private String d_address;

    @NotNull
    private String d_country;

    @NotNull
    private String d_province;

    @NotNull
    private String d_city;

    @NotNull
    private Integer d_postalCode;

    @NotNull
    private LocalDate d_jobStartDate;

    @NotNull
    private String d_status;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Child> children;

}
