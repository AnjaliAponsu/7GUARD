package com.example.GuardBackend.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "VaccineScanView")
public class VaccineScanView {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "VaccineName")
    private String vaccineName;

    @Column(name = "Age")
    private String age;

    @Column(name = "impof_week_range")
    private String impofWeekRange;

    @Column(name = "Description")
    private String description;

    @Column(name = "CHA_ID")
    private Long chaID;

    @Column(name = "CHDR_ID")
    private Long chdrID;

    @Column(name = "VaccinePurpose")
    private String vaccinePurpose;

    @Column(name = "Scan")
    private String Scan;

    @Column(name = "ScanDate")
    private Date scanDate;

    @Column(name = "Email")
    private String email;
}