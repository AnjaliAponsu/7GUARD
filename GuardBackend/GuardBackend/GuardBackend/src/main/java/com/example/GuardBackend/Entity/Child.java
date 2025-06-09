package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer child_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_nic", referencedColumnName = "parent_nic", nullable = false)
    @NotNull
    private Parent parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "d_id", referencedColumnName = "d_id", nullable = false)
    @JsonIgnore
    private Doctor doctor;

    @NotNull
    private String c_fName;

    @NotNull
    private String c_lName;

    @NotNull
    private LocalDate c_dob;

    @NotNull
    private String c_gender;

    @NotNull
    private String relationshipToGuardian;

    @NotNull
    private String c_bloodGroup;

    @NotNull
    private String c_allergies;

    @NotNull
    private String c_medicalCondition;

    @NotNull
    private String assignDoctor;


}
