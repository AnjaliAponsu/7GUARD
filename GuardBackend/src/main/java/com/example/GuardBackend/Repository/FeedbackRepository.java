package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedbackRepository extends JpaRepository <Feedback,Integer>{
    @Query(value = "DELETE FROM employees WHERE id = 1?",nativeQuery = true)
    boolean deleteById(int id);
}
