package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.mapping.Constraint;

@Entity
@Table(name = "ImpOfvaccine")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ImpOfVaccine {
    @Id
    private long impofid;
    @Column(name = "vaccine_name")
    private String impofvaccine_name;
    @Column (name = "Age")
    private String impofAge;
    @Column (name = "impof_week_range")
    private String impofWeekRange;
    @Column (name = "description")
    private String impofdescription;
    
}
