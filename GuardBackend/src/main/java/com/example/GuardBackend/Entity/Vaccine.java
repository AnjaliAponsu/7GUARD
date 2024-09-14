package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.yaml.snakeyaml.events.Event;

@Entity
@Table(name = "vaccine")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "vaccine_name")
    private String vaccine_name;
    @Column (name = "year_range")
    private String year_range;
    @Column (name = "description")
    private String description;
}
