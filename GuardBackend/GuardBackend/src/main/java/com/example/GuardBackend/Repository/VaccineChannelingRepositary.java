package com.example.GuardBackend.Repository;
import com.example.GuardBackend.Entity.VaccineChannelingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VaccineChannelingRepositary  extends JpaRepository<VaccineChannelingEntity, Long> {
    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE cha_id=?1 ",nativeQuery = true)
    VaccineChannelingEntity getChannelingByChannelingID(Long cha_id);

    @Query(value = "SELECT cha_id FROM vaccine_channeling_entity WHERE nic= ?1 ORDER BY channeling_time DESC LIMIT 1", nativeQuery = true)
    Long findLatestOrderIdByIndexNo(String nic);


    @Query(value = "SELECT * FROM vaccine_channeling_entity WHERE channeling_doctor_date= ?1 AND channeling_doctor=?2 ORDER BY channeling_time DESC LIMIT 1", nativeQuery = true)
    VaccineChannelingEntity findLatestOrderId(LocalDate channeling_doctor_date, String channeling_doctor);


    @Query(value = "SELECT * FROM vaccine_channeling_entity WHERE channel_number= ?1 ", nativeQuery = true)
    Optional<VaccineChannelingEntity> findById(Integer channel_number);


    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE cha_id=?1",nativeQuery = true)
    VaccineChannelingEntity updateChannelingByID(Long cha_id);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE channeling_doctor_date=?1 ",nativeQuery = true)
    List<VaccineChannelingEntity> getChannelingByChannelingDate(String channeling_datetime);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE channeling_doctor=?1 ",nativeQuery = true)
    List<VaccineChannelingEntity> getChannelingByChannelingDoctor(String channeling_doctor);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE channeling_doctor_date=?1 AND channeling_doctor=?2 ",nativeQuery = true)
    List<VaccineChannelingEntity> getChannelingByChannelingDateDoctor(LocalDate channeling_datetime, String channeling_doctor);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE doctor_id=?1 AND channeling_doctor_date=?2 ",nativeQuery = true)
    List<VaccineChannelingEntity> countByDoctor_idAndAppointmentDate(Long doctor_id, LocalDate channeling_datetime);

    @Query(value = "SELECT channeling_vaccine_name FROM vaccine_channeling_entity WHERE cha_id= ?1", nativeQuery = true)
    String getVaccineName(Long cha_id);

    @Query(value = "SELECT channeling_doctor_date FROM vaccine_channeling_entity WHERE cha_id= ?1", nativeQuery = true)
    String getChannelingDate(Long cha_id);

    @Query(value = "SELECT channel_number FROM vaccine_channeling_entity WHERE cha_id= ?1", nativeQuery = true)
    int getChannelingNumber(Long cha_id);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE cha_id=?1",nativeQuery = true)
    VaccineChannelingEntity changeChannelingAdmin( Long cha_id);

    @Query(value="SELECT * FROM vaccine_channeling_entity WHERE cha_id=?1",nativeQuery = true)
    VaccineChannelingEntity updateChanneling( Long cha_id);
}
