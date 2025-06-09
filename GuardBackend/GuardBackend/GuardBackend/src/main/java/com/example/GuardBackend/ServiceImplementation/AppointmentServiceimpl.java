package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.AppointmentDTO;
import com.example.GuardBackend.Entity.Appointment;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppointmentServiceimpl {
    List<AppointmentDTO> getAllDoctors();
    List<AppointmentDTO>  getDoctorByDoctorname(@Valid String name);
    Appointment addOrUpdateAppointment(AppointmentDTO appointmentDto);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentsByDate(LocalDate date);
    Optional<Appointment> getAppointmentByDoctorAndDate(Long id, LocalDate availableDate);
    void deleteAppointment(Long id);
    AppointmentDTO getAppointmentByID(@Valid Long id);
    AppointmentDTO updateAppointmentByID(@Valid Long id ,@Valid AppointmentDTO appointmentDTO);
    AppointmentDTO getLatestAppointmentId(@Valid String doctorId);
    AppointmentDTO getDoctorID(@Valid LocalDate availableDate, @Valid String doctorName);
    AppointmentDTO getDoctor(@Valid String doctorName, @Valid Long id);
    AppointmentDTO findByDid(Long id);
}
