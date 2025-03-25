package com.example.GuardBackend.Repository;

import com.example.GuardBackend.DTO.ImpOfVaccineDTO;
import com.example.GuardBackend.Entity.Scan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface ScanRepo extends JpaRepository<Scan, Long> {

    @Query("SELECT s FROM Scan s WHERE s.cha_id = ?1")
    Scan findByChaId(Long cha_id);

    @Query("SELECT s FROM Scan s WHERE s.impOfVaccine.impofid = ?1 AND s.CHDR_id = ?2")
    List<Scan> findScansByVaccineIdAndCHDRId(Long vaccineId, Long CHDR_id);

    @Query(value="SELECT * FROM scan WHERE chdr_id=?1 AND vaccine_name=?2 ORDER BY chdr_id DESC LIMIT 1",nativeQuery = true)
    ImpOfVaccineDTO checkInjection(Integer chdr_id, String vaccineName);

    @Query(value="SELECT * FROM scan WHERE chdr_id=?1",nativeQuery = true)
    List<Object[]> findScansByCHDR(Long chdr_id);



    //Amada
    @Query(value="SELECT * FROM scan WHERE chdr_id=?1 ",nativeQuery = true)
    Scan getrecord(Long id);

    //Amada
    @Query(value="SELECT * FROM scan WHERE chdr_id=?1 ",nativeQuery = true)
    List<Scan> getrecords(Integer chdr);
}
