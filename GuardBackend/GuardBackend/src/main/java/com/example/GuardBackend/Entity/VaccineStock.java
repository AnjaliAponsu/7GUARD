package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "vaccine_stock")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class VaccineStock {
    @Id
    @Column (name = "vlistid")
    private long vlistid;
    private String vlistvaccine_name;
    private long vlistquantity;
    private LocalDate expiredDate;
    private LocalDate manufactureDate;

    @OneToOne (cascade = CascadeType.ALL)
    @JoinColumn (name = "pid", referencedColumnName = "pid")
    @JsonBackReference
    private PVaccineList pVaccineList;
}