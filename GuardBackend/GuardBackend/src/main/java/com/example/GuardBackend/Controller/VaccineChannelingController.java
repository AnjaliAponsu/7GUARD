package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.ResponseDTO;
import com.example.GuardBackend.DTO.VaccineChanneling;
import com.example.GuardBackend.Entity.VaccineChannelingEntity;
import com.example.GuardBackend.Repository.VaccineChannelingRepositary;
import com.example.GuardBackend.ServiceImplementation.VaccineChannelingimp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "7Guard/Channeling/VaccineChanneling")
@CrossOrigin
public class VaccineChannelingController {

    @Autowired
    private VaccineChannelingimp vaccineChannelingimp;

    @Autowired
    private VaccineChannelingRepositary vaccineChannelingRepositary;

    @GetMapping("/getVaccineChannelings")//no use
    public List<VaccineChanneling> getVaccineChanneling() {


        return vaccineChannelingimp.getAllVaccineChannelings();
    }

    @PutMapping("/changeChannelingAdmin/{cha_id}")//ok
    public VaccineChanneling changeChannelingAdmin(@Valid @PathVariable Long cha_id , @Valid @RequestBody VaccineChanneling vaccineChanneling) {
        return vaccineChannelingimp.changeChannelingAdmin(cha_id,vaccineChanneling);
    }

    @PutMapping("/updateChannelingByID/{cha_id}")//ok
    public ResponseEntity<ResponseDTO> updateChannelingByID(@Valid @PathVariable Long cha_id, @Valid @RequestBody VaccineChanneling vaccineChanneling) {
        ResponseDTO response = vaccineChannelingimp.updateChannelingByID(cha_id, vaccineChanneling);
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/deleteChannelingByChannelingID/{cha_id}")//ok
    public boolean deleteChannelingByChannelingID(@Valid @PathVariable Long cha_id) {

        return vaccineChannelingimp.deleteChannelingByChannelingID(cha_id);
    }

    @GetMapping("/getChannelingByChannelingID/{cha_id}")//ok
    public VaccineChanneling getChannelingByChannelingID(@Valid @PathVariable Long cha_id) {
        return vaccineChannelingimp.getChannelingByChannelingID(cha_id);
    }

    @GetMapping("/getChannelingByChannelingDate/{channeling_datetime}")//ok
    public List<VaccineChanneling> getChannelingByChannelingDate(@Valid @PathVariable String channeling_datetime) {
        return vaccineChannelingimp.getChannelingByChannelingDate(channeling_datetime);
    }

    @GetMapping("/getChannelingByChannelingDoctor/{channeling_doctor}")//ok
    public List<VaccineChanneling> getChannelingByChannelingDoctor(@Valid @PathVariable String channeling_doctor) {
        return vaccineChannelingimp.getChannelingByChannelingDoctor(channeling_doctor);
    }

    @GetMapping("/getChannelingByChannelingDateDoctor/{channeling_datetime}/{channeling_doctor}")//ok
    public List<VaccineChanneling> getChannelingByChannelingDateDoctor(@Valid @PathVariable LocalDate channeling_datetime, @Valid @PathVariable String channeling_doctor) {
        return vaccineChannelingimp.getChannelingByChannelingDateDoctor(channeling_datetime, channeling_doctor);
    }


    @GetMapping("/getLatestChannelingIdForUser/{nic}")//ok
    public ResponseEntity<VaccineChanneling> getLatestChannelingIdForUser(@Valid @PathVariable String nic) {
        VaccineChanneling latestChanneling = vaccineChannelingimp.getLatestChannelingIdForUser(nic);
        if (latestChanneling != null) {
            return ResponseEntity.ok(latestChanneling);
        } else {
            return null;
        }
    }

    @GetMapping("/getLatestChannelingId/{channeling_doctor_date}/{channeling_doctor}")//ok
    public ResponseEntity<? extends Object> getLatestChannelingId(@Valid @PathVariable LocalDate channeling_doctor_date,@Valid @PathVariable String channeling_doctor) {
        VaccineChanneling latestChanneling = vaccineChannelingimp.getLatestChannelingId(channeling_doctor_date, channeling_doctor);

        if (latestChanneling != null) {
            return ResponseEntity.ok(latestChanneling);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/countChannelingRecords/{doctor_id}/{appointmentDate}")//ok
    public ResponseEntity<?> countRecords(
            @Valid @PathVariable Long doctor_id,
            @Valid @PathVariable LocalDate appointmentDate) {
        List<VaccineChannelingEntity>  count = vaccineChannelingRepositary.countByDoctor_idAndAppointmentDate(doctor_id, appointmentDate);
        return ResponseEntity.ok(count != null ? count : 0);
    }

    @PostMapping("/schedules")//ok
    public ResponseEntity<ResponseDTO> scheduleChanneling(@Valid @RequestBody VaccineChanneling vaccineChanneling) {
        ResponseDTO response = vaccineChannelingimp.processChanneling(vaccineChanneling);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/updateChanneling/{cha_id}")//ok
    public VaccineChanneling updateChanneling(@Valid @PathVariable Long cha_id,@Valid  @RequestBody VaccineChanneling vaccineChanneling){
        return vaccineChannelingimp.updateChanneling(cha_id,vaccineChanneling);
    }
}