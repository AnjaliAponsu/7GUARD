package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<Staff, Integer> {
    Staff findByWorkEmail(String workEmail);
}
