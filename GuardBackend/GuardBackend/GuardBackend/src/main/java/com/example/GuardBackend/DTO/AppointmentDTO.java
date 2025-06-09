package com.example.GuardBackend.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class AppointmentDTO {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String doctorId;
    private String doctorName;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate availableDate;
    private int appointmentsPerDay;


}
