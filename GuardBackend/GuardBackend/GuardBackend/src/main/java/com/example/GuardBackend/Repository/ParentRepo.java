package com.example.GuardBackend.Repository;
import com.example.GuardBackend.Entity.Parent;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository

public interface ParentRepo extends JpaRepository<Parent, Integer> {
    Optional<Parent> findByParentNic(String parentNic);

    @NotNull
    List<Parent> findAll();


    @Query(value="SELECT * FROM parent WHERE parent_nic=?1", nativeQuery = true) //Amada
    Parent getParentByParentNIC(String parentNic);
}
