package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.SideEffectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SideEffectRepository extends JpaRepository<SideEffectEntity, Integer> {
     // Corrected method name

    @Query("SELECT s FROM SideEffectEntity s WHERE s.vaccineName = :vaccineName")
    SideEffectEntity findByVaccineName(@Param("vaccineName") String vaccineName);


}