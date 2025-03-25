package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity

public class VaccineChannelingEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long cha_id;

    @NotBlank(message = "NIC cannot be null or blank")
    @Column(nullable = false)
    @Size(min = 12, max = 12, message = "NIC must be 12 characters long")
    private String nic;

    @NotBlank(message = "parent name cannot be null")
    @Column(nullable = false)
    private String channeling_parent_name;

    @NotNull(message = "chdr cannot be null")
    @Column(nullable = false)
    private Integer channeling_chdr;

    @NotBlank(message = "chiild name cannot be null")
    @Column(nullable = false)
    private String channeling_babyname;

    @NotBlank(message = " telephone number cannot be null")
    @Column(nullable = false)
    private String channeling_telephone;

    @NotBlank(message = "doctor name cannot be null")
    @Column(nullable = false)
    private String channeling_doctor;

    private LocalDate channeling_date;

    @NotBlank(message = "doctor time cannot be null")
    @Column(nullable = false)
    private String channeling_time;

    @NotBlank(message = "vaccine name cannot be null")
    @Column(nullable = false)
    private String channeling_vaccine_name;

    @NotNull(message = "bill cannot be null")
    @Column(nullable = false)
    private double channeling_bill;

    @NotNull(message = "date cannot be null")
    @Column(nullable = false)
    private LocalDate channeling_doctor_date;

    private int requested_qty;

    private int channel_number;

    private int status;

    private Long doctor_id;

    private LocalTime arriving_time;

    private double child_age;

    private int admin_status;

    private String email;
}