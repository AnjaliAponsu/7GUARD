package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.CHDR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ChdrRepo extends JpaRepository<CHDR, Integer> {
    boolean existsById(Integer chdrId);


    @Query(value="SELECT * FROM chdr WHERE child_id=?1", nativeQuery = true) //Amada
    CHDR getChildByChildCHDR(Integer child_id);

    Optional<CHDR> findByChdrId(Integer chdrId); //Rasuni

    @Query(value = "SELECT * FROM chdr WHERE chdr_id = ?1", nativeQuery = true)
    CHDR getChildIdByChildCHDR(Integer chdr_id);

    @Query("SELECT c FROM CHDR c WHERE c.child.child_id = :child_id") //Dewindi
    Optional<CHDR> findByChild_Child_Id(@Param("child_id") Integer child_id);


}
