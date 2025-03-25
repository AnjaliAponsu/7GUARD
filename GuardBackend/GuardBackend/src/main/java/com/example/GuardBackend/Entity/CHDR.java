package com.example.GuardBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="chdr")

public class CHDR {
    @Id
    @NotNull
    @Column (name="chdr_id")
    private Integer chdrId;

    @NotNull
    @OneToOne
    @JoinColumn(name = "child_id", referencedColumnName = "child_id", nullable = false)
    private Child child;

  @NotNull
 private String parentNic;
  @NotNull
  private String email;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private LocalDate dob;

    @NotNull
    private String gender;

    @NotNull
    private String bloodGroup;

    @NotNull
    private String allergies;

    @NotNull
    private String assignDoctor;

    @NotNull
    private String medicalCondition;

    @OneToMany(mappedBy = "chdr", cascade = CascadeType.ALL) //Rasuni
    @JsonIgnore // Prevent serialization of this field
    private List<Bmi> bmiRecords;

    public List<Bmi> getBmiRecords() {
        return bmiRecords;
    }

    public void setBmiRecords(List<Bmi> bmiRecords) {
        this.bmiRecords = bmiRecords;
    }



}
