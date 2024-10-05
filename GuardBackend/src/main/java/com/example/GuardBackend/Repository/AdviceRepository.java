package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdviceRepository extends JpaRepository<Advice, Long> {
    List<Advice> findByCategory(String category);
}
