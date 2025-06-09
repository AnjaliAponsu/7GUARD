package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.AppointmentDTO;
import com.example.GuardBackend.Entity.Appointment;
import com.example.GuardBackend.Repository.AppointmentRepository;
import com.example.GuardBackend.ServiceImplementation.AppointmentServiceimpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService implements AppointmentServiceimpl {

    @Autowired
    private final AppointmentRepository appointmentRepository ;
    @Autowired
    private ModelMapper modelMapper;


    @Override// Add or Update an appointment
    public Appointment addOrUpdateAppointment(AppointmentDTO appointmentDto) {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(appointmentDto.getDoctorId());
        appointment.setDoctorName(appointmentDto.getDoctorName());
        appointment.setAvailableDate(appointmentDto.getAvailableDate());
        appointment.setStartTime(appointmentDto.getStartTime());
        appointment.setEndTime(appointmentDto.getEndTime());
        appointment.setAppointmentsPerDay(appointmentDto.getAppointmentsPerDay());

        return appointmentRepository.save(appointment);
    }

    @Override// Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override// Get appointments by available date
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAvailableDate(date);
    }

    @Override// Get appointment by doctor ID and available date
    public Optional<Appointment> getAppointmentByDoctorAndDate(Long id, LocalDate availableDate) {
        return appointmentRepository.findById(id);
    }

    @Override// Delete appointment
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public AppointmentDTO getAppointmentByID(@Valid Long id){
        Appointment appointment=appointmentRepository.getappointmentID(id);
        return modelMapper.map(appointment,AppointmentDTO.class);
    }
    @Override
    public AppointmentDTO updateAppointmentByID(@Valid Long id ,@Valid AppointmentDTO appointmentDTO){
       Appointment appointment=appointmentRepository.updateAppointmentByID(id);
        appointmentRepository.save(modelMapper.map(appointmentDTO, Appointment.class));
        return appointmentDTO;
    }
    @Override
    public AppointmentDTO getLatestAppointmentId(@Valid String doctorId) {
        Long latestappointmentId =appointmentRepository.findLatestOrderIdByIndexNo(doctorId);
        if (latestappointmentId != null) {
            Optional<Appointment> channelingOptional = appointmentRepository.findById(latestappointmentId);
            if (channelingOptional.isPresent()) {
                return modelMapper.map(channelingOptional.get(), AppointmentDTO.class);
            }
        }
        return null;
    }


    @Override
    public List<AppointmentDTO> getAllDoctors(){
        List<Appointment>doctorList=appointmentRepository.findAll();
        return modelMapper.map(doctorList,new TypeToken<List<AppointmentDTO>>(){}.getType());

    }

    @Override
    public List<AppointmentDTO> getDoctorByDoctorname(@Valid String doctorName){
        List<Appointment> doctorList=appointmentRepository.getDoctorByDoctorname(doctorName);
        return modelMapper.map(doctorList,new TypeToken<List<AppointmentDTO>>(){}.getType());
    }

    @Override
    public AppointmentDTO getDoctorID(@Valid LocalDate availableDate, @Valid String doctorName){
        Appointment channeling=appointmentRepository.getDoctorID(availableDate,doctorName);
        return modelMapper.map(channeling, AppointmentDTO.class);
    }
    @Override
    public AppointmentDTO getDoctor(@Valid String doctorName, @Valid Long id){
        Appointment channeling=appointmentRepository.getDoctor(doctorName,id);
        return modelMapper.map(channeling, AppointmentDTO.class);
    }
    @Override
    public AppointmentDTO findByDid(Long id) {

        return appointmentRepository.findByDid(id);
    }
}
