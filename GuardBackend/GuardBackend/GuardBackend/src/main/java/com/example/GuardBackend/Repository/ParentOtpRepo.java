package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.ParentOTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParentOtpRepo extends JpaRepository<ParentOTP,Integer> {
    ParentOTP findByParent_ParentNic(String parentNic);

    @Modifying
    @Query("UPDATE ParentOTP p SET p.parent.parentNic = :newParentNic WHERE p.parent.parentNic = :oldParentNic")
    void updateParentNic(@Param("oldParentNic") String oldParentNic, @Param("newParentNic")String newParentNic);
}
