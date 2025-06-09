package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Scan")
public class Scan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "cha_id", unique = true, nullable = false)
    private Long cha_id;

    @Column(name = "chdr_id", nullable = false)
    private Long CHDR_id;

    @Column(name = "vaccine_purpose", nullable = false)
    private String vaccine_purpose;

    @Column(name = "vaccine_name", nullable = false)
    private String vaccine_name;

    @Column(name = "scan")
    private Long scan;

    @Column(name = "date")
    private Date date;

    private String email;

    @ManyToOne
    @JoinColumn(name = "impofid", nullable = false)
    @JsonBackReference
    private ImpOfVaccine impOfVaccine;
}
