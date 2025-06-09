package com.example.GuardBackend.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pvaccine_list")
public class PVaccineList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pid;

    @OneToOne (mappedBy = "pVaccineList")
    @JsonBackReference
    private VaccineStock vaccineStock;
}
