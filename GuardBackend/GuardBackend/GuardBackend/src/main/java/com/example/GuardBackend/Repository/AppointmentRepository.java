package com.example.GuardBackend.Repository;
import com.example.GuardBackend.DTO.AppointmentDTO;
import com.example.GuardBackend.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByAvailableDate(LocalDate availableDate);

    @Query(value="SELECT * FROM appointment WHERE id=?1 ",nativeQuery = true)
    Appointment getappointmentID(Long id);

    @Query(value = "SELECT id FROM appointment WHERE doctor_id= ?1 ORDER BY available_date DESC LIMIT 1", nativeQuery = true)
    Long findLatestOrderIdByIndexNo(String nic);

    @Query(value="SELECT * FROM appointment WHERE id=?1",nativeQuery = true)
    Appointment updateAppointmentByID(Long id);

    @Query(value="SELECT * FROM appointment WHERE doctor_name=?1",nativeQuery = true)
    List<Appointment> getDoctorByDoctorname(String doctorName);

    @Query(value="SELECT * FROM appointment WHERE doctor_name=?1",nativeQuery = true)
    List<Appointment> findByName(String channeling_doctor);

    @Query("SELECT a FROM Appointment a WHERE a.id = ?1 AND a.availableDate = ?2")
    Appointment findByDoctorIdAndAllocationDate(Long id, LocalDate availableDate);

    @Query(value="SELECT * FROM appointment WHERE available_date=?1 AND doctor_name=?2",nativeQuery = true)
    Appointment getDoctorID(LocalDate availableDate, String doctorName);

    @Query(value="SELECT * FROM appointment WHERE doctor_name=?1 AND id=?2",nativeQuery = true)
    Appointment getDoctor(String doctor_name, Long id);

    @Query(value = "SELECT appointments_per_day FROM appointment WHERE id=?1 AND available_date=?2",nativeQuery = true)
    int getAllocationByDoctorIdAndDate( Long id,  LocalDate channeling_datetime);

    @Query(value="SELECT * FROM appointment WHERE id = ?1",nativeQuery = true)
    AppointmentDTO findByDid(Long id);
}
