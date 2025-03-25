package com.example.GuardBackend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Appointment {
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
