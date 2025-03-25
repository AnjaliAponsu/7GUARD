package com.example.GuardBackend.Repository;

import com.example.GuardBackend.DTO.BmiDTO;
import com.example.GuardBackend.Entity.Bmi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BmiRepo extends JpaRepository<Bmi, Integer> {

    @Query("SELECT new com.example.GuardBackend.DTO.BmiDTO(b.bmiValue, b.childWeight, b.childHeight, b.bmiStatus, b.date) FROM Bmi b WHERE b.chdr.chdrId = :chdrId")
    List<BmiDTO> findBmiByChdrId(@Param("chdrId") Integer chdrId);

}
