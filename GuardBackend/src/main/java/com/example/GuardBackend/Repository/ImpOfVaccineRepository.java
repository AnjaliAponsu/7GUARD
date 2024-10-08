package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.ImpOfVaccine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImpOfVaccineRepository extends JpaRepository<ImpOfVaccine,Long> {

    Optional<ImpOfVaccine> findById(Long impofid);
}
