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

public class VaccineChanneling {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long cha_id;

    private String nic;

    private String channeling_parent_name;

    private Integer channeling_chdr;

    private String channeling_babyname;

    private String channeling_telephone;

    private String channeling_doctor;

    private LocalDate channeling_date;

    private String channeling_time;

    private String channeling_vaccine_name;

    private double channeling_bill;

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
