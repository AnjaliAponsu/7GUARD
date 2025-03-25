package com.example.GuardBackend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long chdr;

    private Long vaccineScanId;
    private String next;
    private String email;
    private Date vaccinatedDate;

    private String scanDetails;

    private LocalDate reminderDate;

    private String status;
}
