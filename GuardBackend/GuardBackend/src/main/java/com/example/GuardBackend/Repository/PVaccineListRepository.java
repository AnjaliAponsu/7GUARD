package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.PVaccineList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PVaccineListRepository extends JpaRepository<PVaccineList,Long> {
}
