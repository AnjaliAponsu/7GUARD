package com.example.GuardBackend.Repository;
import com.example.GuardBackend.Entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrescriptionRepo extends JpaRepository<Prescription, Long> {

    @Query(value = "SELECT id FROM prescription WHERE cha_id= ?1 ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Long findLatestPrescriptionId(Long cha_id);

    @Query(value="SELECT * FROM prescription WHERE id=?1 ",nativeQuery = true)
    Prescription getPrescriptionByPrescriptionID(Long id);

    @Query(value="SELECT * FROM prescription WHERE id=?1",nativeQuery = true)
    Prescription updatePrescriptionByID(Long id);
}
