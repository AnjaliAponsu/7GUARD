package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.DoctorDTO;
import com.example.GuardBackend.Entity.Child;
import com.example.GuardBackend.Entity.Doctor;
import com.example.GuardBackend.Repository.ChildRepo;
import com.example.GuardBackend.Repository.DoctorRepo;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.ServiceImplementation.DoctorService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceIMPL implements DoctorService {
    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private ChildRepo childRepo;

    @Autowired
    private DoctorEmailService doctorEmailService;

    private final ModelMapper modelMapper;

    @Autowired
    public DoctorServiceIMPL(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public void addDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = modelMapper.map(doctorDTO, Doctor.class);
        Doctor savedDoctor = doctorRepo.save(doctor);

        doctorEmailService.sendDoctorEmailService(savedDoctor.getDoctorWorkEmail(), savedDoctor.getD_password());
    }

    @Override
    public void sendEmailToDoctor(String doctorWorkEmail, String d_password) {
    }

    @Override
    public List<Doctor> getAllDoctors(){
        List<Doctor> doctorList = doctorRepo.findAll();
        return modelMapper.map(doctorList,new TypeToken<java.util.List<DoctorDTO>>(){}.getType());
    }

    @Override
    @Transactional
    public ApiResponse updateDoctor(Integer d_id, Doctor updateDoctor){
        Optional<Doctor>doctorOptional = doctorRepo.findById(d_id);

        if(doctorOptional.isPresent()){
            Doctor existingDoctor = doctorOptional.get();
            existingDoctor.setDocFullName(updateDoctor.getDocFullName());
            existingDoctor.setD_nic(updateDoctor.getD_nic());
            existingDoctor.setD_mobileNumber(updateDoctor.getD_mobileNumber());
            existingDoctor.setD_workNumber(updateDoctor.getD_workNumber());
            existingDoctor.setD_personalEmail(updateDoctor.getD_personalEmail());
            existingDoctor.setDoctorWorkEmail(updateDoctor.getDoctorWorkEmail());
            existingDoctor.setD_gender(updateDoctor.getD_gender());
            existingDoctor.setD_department(updateDoctor.getD_department());
            existingDoctor.setD_licenseNumber(updateDoctor.getD_licenseNumber());
            existingDoctor.setD_specialization(updateDoctor.getD_specialization());
            existingDoctor.setD_dob(updateDoctor.getD_dob());
            existingDoctor.setD_address(updateDoctor.getD_address());
            existingDoctor.setD_country(updateDoctor.getD_country());
            existingDoctor.setD_province(updateDoctor.getD_province());
            existingDoctor.setD_city(updateDoctor.getD_city());
            existingDoctor.setD_postalCode(updateDoctor.getD_postalCode());
            existingDoctor.setD_jobStartDate(updateDoctor.getD_jobStartDate());
            existingDoctor.setD_status(updateDoctor.getD_status());

            Doctor saveDoctor = doctorRepo.save(existingDoctor);

            List<Child> children = childRepo.findByDoctor(existingDoctor);
            for (Child child : children) {
                child.setAssignDoctor(updateDoctor.getDocFullName());
                childRepo.save(child);
            }


            return new ApiResponse("Updated Successfully");
        }

        else{
            return new ApiResponse("Doctor Not Found");
        }
    }

    @Override
    public DoctorDTO getDoctorByWorkEmail(String doctorWorkEmail){
        Doctor doctor = doctorRepo.findByDoctorWorkEmail(doctorWorkEmail);
        return modelMapper.map(doctor, DoctorDTO.class);
    }

    @Override
    public DoctorDTO getDoctorById(Integer d_id){
        Optional<Doctor> doctor = doctorRepo.findById(d_id);
        return modelMapper.map(doctor, DoctorDTO.class);
    }

    @Override
    public ApiResponse updatePassword(DoctorDTO doctorDTO){
        String newPassword = doctorDTO.getNewPassword();
        String confirmPassword = doctorDTO.getConfirmPassword();

        Doctor doctor = doctorRepo.findByDoctorWorkEmail(doctorDTO.getDoctorWorkEmail());

        if(doctor != null){
            if (newPassword == null || confirmPassword == null) {
                return new ApiResponse("New password and confirm password cannot be null.");
            }

            if(!newPassword.equals(confirmPassword)){
                return new ApiResponse("New password and confirm password do not match. Please try again.");
            }
            doctor.setD_password(newPassword);
            doctorRepo.save(doctor);
            return new ApiResponse("Password updated successfully. Please use the new password to log in.");
        }

        else{
            return new ApiResponse("Doctor not found for given Email");
        }

    }


}
