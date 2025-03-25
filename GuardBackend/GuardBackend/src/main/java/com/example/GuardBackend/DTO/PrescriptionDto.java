package com.example.GuardBackend.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDto {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Long id;


    private Integer CHDR_id;

    private Long cha_id;


    private String prescription;


    private String Dose;

    private LocalTime p_time;

    private LocalDate p_date;
}
