package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    boolean existsByVaccineScanId(Long vaccineScanId);

    @Query(value="SELECT * FROM reminder WHERE status='Pending'",nativeQuery = true)
    List<Reminder> findAlldetails();
}
