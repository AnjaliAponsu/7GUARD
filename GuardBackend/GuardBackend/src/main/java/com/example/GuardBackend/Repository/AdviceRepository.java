package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface AdviceRepository extends JpaRepository<Advice, Integer> {

    @Query("SELECT a FROM Advice a WHERE a.bmiStatus = ?1")
    Optional<Advice> findMessageByBmiStatus(String bmiStatus);




}
