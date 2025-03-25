package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Prescription {
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "CHDR_id")
    @NotNull
    private Integer CHDR_id;
    @NotNull
    private Long cha_id;
    @NotBlank
    private String Prescription;

    private String Dose;

    private LocalTime p_time;

    private LocalDate p_date;

}
