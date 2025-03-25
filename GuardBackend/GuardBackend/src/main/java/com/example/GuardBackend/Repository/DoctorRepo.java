package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByDocFullName(String docFullName);

    Doctor findByDoctorWorkEmail(String doctorWorkEmail);

    List<Doctor> findAll();
}
