package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ResponseDTO;
import com.example.GuardBackend.DTO.VaccineChanneling;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

public interface VaccineChannelingimp {
    VaccineChanneling saveChanneling(@Valid VaccineChanneling vaccineChanneling);
    VaccineChanneling updateVaccineChanneling (@Valid VaccineChanneling vaccineChanneling);
    List<VaccineChanneling> getAllVaccineChannelings();
    VaccineChanneling getChannelingByChannelingID(@Valid Long cha_id);
    VaccineChanneling getLatestChannelingIdForUser(@Valid String nic);
    ResponseDTO updateChannelingByID(@Valid Long cha_id , @Valid VaccineChanneling vaccineChanneling);
    boolean deleteChannelingByChannelingID(@Valid Long cha_id);
    ResponseDTO processChanneling(VaccineChanneling vaccineChanneling);
    VaccineChanneling getLatestChannelingId(@Valid LocalDate channeling_doctor_date, @Valid String channeling_doctor);
    List<VaccineChanneling> getChannelingByChannelingDate(@Valid String channeling_datetime);
    List<VaccineChanneling> getChannelingByChannelingDoctor(@Valid String channeling_doctor);
    VaccineChanneling changeChannelingAdmin( @Valid Long cha_id, VaccineChanneling vaccineChanneling);
    VaccineChanneling updateChanneling(@Valid Long cha_id ,@Valid VaccineChanneling vaccineChanneling);
    List<VaccineChanneling> getChannelingByChannelingDateDoctor(@Valid LocalDate channeling_datetime, @Valid String channeling_doctor);
}

