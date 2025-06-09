package com.example.GuardBackend.Controller;


import com.example.GuardBackend.DTO.AppointmentDTO;
import com.example.GuardBackend.Entity.Appointment;
import com.example.GuardBackend.Repository.AppointmentRepository;
import com.example.GuardBackend.ServiceImplementation.AppointmentServiceimpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "7Guard/Doctor")
@CrossOrigin
public class AppointmentController {
    @Autowired
    private AppointmentServiceimpl appointmentServiceimpl;
    @Autowired
    private AppointmentRepository appointmentRepository;

    // Add or Update appointment
    @PostMapping("/add")
    public ResponseEntity<Appointment> addAppointment(@RequestBody AppointmentDTO appointmentDto) {
        Appointment savedAppointment = appointmentServiceimpl.addOrUpdateAppointment(appointmentDto);
        return ResponseEntity.ok(savedAppointment);
    }

    // Get all appointments
    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentServiceimpl.getAllAppointments();
    }

    // Search appointments by date
    @GetMapping("/search")
    public List<Appointment> getAppointmentsByDate(@RequestParam("date") String date) {
        LocalDate availableDate = LocalDate.parse(date);
        return appointmentServiceimpl.getAppointmentsByDate(availableDate);
    }

    // Delete an appointment
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentServiceimpl.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }

    @GetMapping("/getAppointmentById/{id}")//ok
    public AppointmentDTO getAppointmentById(@Valid @PathVariable Long id) {
        return appointmentServiceimpl.getAppointmentByID(id);
    }

    @PutMapping("/updateAppointmentByID/{id}")
    public AppointmentDTO updateAppointmentByID(@Valid @PathVariable Long id,@Valid  @RequestBody AppointmentDTO appointmentDTO){
        return appointmentServiceimpl.updateAppointmentByID(id,appointmentDTO);
    }

    @GetMapping("/getLatestAppointmentId/{doctorId}")
    public ResponseEntity<AppointmentDTO> getLatestAppointmentId(@Valid @PathVariable String doctorId) {
        AppointmentDTO latestChanneling = appointmentServiceimpl.getLatestAppointmentId(doctorId);
        if (latestChanneling != null) {
            return ResponseEntity.ok(latestChanneling);
        } else {
            return null;
        }
    }



//Amada

    @GetMapping("/getDoctors")//ok
    public List<AppointmentDTO> getDoctors() {

        return appointmentServiceimpl.getAllDoctors();
    }

    @GetMapping( "/getDoctorByDoctorname/{doctorName}")//ok
    public List<AppointmentDTO> getDoctorByDoctorname(@Valid @PathVariable String doctorName){
        return appointmentServiceimpl.getDoctorByDoctorname(doctorName);}


    @GetMapping("/getDoctorAllocation/{id}")
    public ResponseEntity<AppointmentDTO> getDoctorAllocation(@Valid @PathVariable Long id) {

        AppointmentDTO doctor = appointmentServiceimpl.findByDid(id);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/getDoctorID/{availableDate}/{doctorName}")//ok
    public AppointmentDTO getDoctorID(@Valid @PathVariable LocalDate availableDate, @Valid @PathVariable String doctorName) {
        return appointmentServiceimpl.getDoctorID(availableDate,doctorName);
    }


    @GetMapping("/getDoctor/{doctorName}/{id}")//ok
    public AppointmentDTO getDoctor(@Valid @PathVariable String doctorName, @Valid @PathVariable Long id) {
        return appointmentServiceimpl.getDoctor(doctorName,id);
    }

    @GetMapping("/doctorAllocation/{id}/{availableDate}")
    public ResponseEntity<?> getDoctorAllocation(
            @Valid @PathVariable Long id,
           @Valid @PathVariable LocalDate availableDate) {
        int allocation = appointmentRepository.getAllocationByDoctorIdAndDate(id,availableDate);
        return ResponseEntity.ok(allocation);
    }

}
