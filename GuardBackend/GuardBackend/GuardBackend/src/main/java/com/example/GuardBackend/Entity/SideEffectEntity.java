package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "MEDICATION")
public class SideEffectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mid")
    private int mId;

    @Column(name = "vaccine_name", nullable = false)
    private String vaccineName;

    @Column(name = "side_effect", nullable = false)
    private String sideEffect;

    @Column(name = "medication", nullable = false)
    private String medication;

    // Constructor with all fields (including mId for existing records)
    public SideEffectEntity(int mId, String vaccineName, String sideEffect, String medication) {
        this.mId = mId;
        this.vaccineName = vaccineName;
        this.sideEffect = sideEffect;
        this.medication = medication;
    }

    // Constructor for creating new records (without mId)
    public SideEffectEntity(String vaccineName, String sideEffect, String medication) {
        this.vaccineName = vaccineName;
        this.sideEffect = sideEffect;
        this.medication = medication;
    }

    // Additional constructor for more complex cases if needed
    public SideEffectEntity(String vaccineName, String sideEffect, String medication, LocalDate date, String scanResult, String vname) {
        // Assuming you want to include more fields (e.g., date, scanResult) in the future
        this.vaccineName = vaccineName;
        this.sideEffect = sideEffect;
        this.medication = medication;
        // You can add more field initialization as needed
    }
}
