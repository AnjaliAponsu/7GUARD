package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.VaccineScanView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface ImpOfVaccineScanViewRepository extends JpaRepository<VaccineScanView, Long> {
    @Query(value = """
        SELECT
            s.id,
            s.chdr_id,
            s.cha_id,
            s.date AS scan_date,
            s.scan,
            s.vaccine_name,
            s.vaccine_purpose,
            s.email,
            i.impofid,
            i.age,
            i.impof_week_range,
            i.description
        FROM
            scan s
        INNER JOIN
            imp_ofvaccine i
        ON
            s.impofid = i.impofid
        """, nativeQuery = true)
    List<VaccineScanView> getAllVaccineScans();

    @Query("SELECT id FROM VaccineScanView WHERE id IN :ids")
    List<Long> findExistingIds(List<Long> ids);



    @Query("SELECT COUNT(s) > 0 FROM VaccineScanView s WHERE s.id = :id")
    boolean existsById(@Param("id") Long id);


    @Modifying
    @Query("DELETE FROM VaccineScanView s WHERE s.id = :id")
    void deleteById(@Param("id") Long chdrID);

}