package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository <Feedback,Long>{
}
