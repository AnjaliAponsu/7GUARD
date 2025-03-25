package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.Child;
import com.example.GuardBackend.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ChildRepo extends JpaRepository<Child, Integer> {
    @Query(value="SELECT * FROM child WHERE parent_nic=?1 ",nativeQuery = true)//Amada
    List<Child>  getChildByParentNic(String parentNic);

    @Modifying
    @Query("UPDATE Child c SET c.parent.parentNic = :newParentNic WHERE c.parent.parentNic = :oldParentNic")
    void updateParentNic(@Param("oldParentNic") String oldParentNic, @Param("newParentNic") String newParentNic);

    List<Child> findByDoctor(Doctor existingDoctor);

    List<Child> findByParent_ParentNic(String parentNic);
}
