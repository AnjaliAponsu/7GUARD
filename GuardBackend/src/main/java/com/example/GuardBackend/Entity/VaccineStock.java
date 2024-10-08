package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "VaccineList")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class VaccineStock {
    @Id
    private long vlistid;
    @Column (name = "vaccine_name")
    private String vlistvaccineName;
    private long vlistquantity;
    private Date ExpiredDate;
    private Date ManufactureDate;


}
