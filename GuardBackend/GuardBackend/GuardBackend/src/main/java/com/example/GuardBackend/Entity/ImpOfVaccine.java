package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

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

    @OneToMany(mappedBy = "impOfVaccine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Scan> scans;

}
