package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "parent")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer parent_id;

    @NotNull
    @Column(name = "parent_nic")
    private String parentNic;

    @NotNull
    private String p_fName;

    @NotNull
    private String p_lName;

    @NotNull
    private String p_mobileNumber;

    @NotNull
    private String p_email;

    @NotNull
    private String p_gender;

    @NotNull
    private LocalDate p_dob;

    @NotNull
    private String p_address;

    @NotNull
    private String p_country;

    @NotNull
    private String p_province;

    @NotNull
    private String p_city;

    @NotNull
    private Integer p_postalCode;

    @NotNull
    private String p_relationship;

    @NotNull
    private String emergencyContactName;

    @NotNull
    private String emergencyContactPhone;

    @NotNull
    private String emergencyContactRelation;


    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children = new ArrayList<>();

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<ParentOTP> parentOtp;


}