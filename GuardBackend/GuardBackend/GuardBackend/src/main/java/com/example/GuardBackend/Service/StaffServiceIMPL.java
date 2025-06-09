package com.example.GuardBackend.Service;
import com.example.GuardBackend.DTO.StaffDTO;
import com.example.GuardBackend.Entity.Staff;
import com.example.GuardBackend.Repository.StaffRepo;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.ServiceImplementation.StaffService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceIMPL implements StaffService {
    @Autowired
    private StaffRepo staffRepo;

    @Autowired
    private StaffEmailService staffEmailService;

    private final ModelMapper modelMapper;

    @Autowired
    public StaffServiceIMPL(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public void addStaff(StaffDTO staffDTO){
        Staff staff = modelMapper.map(staffDTO, Staff.class);
        Staff savedStaff = staffRepo.save(staff);

        staffEmailService.sendStaffEmailService(savedStaff.getWorkEmail(), savedStaff.getS_password());
    }

    @Override
    public void sendEmailToStaff(String workEmail, String s_password) {
    }

    @Override
    public ApiResponse updateStaff(Integer s_id, Staff updatestaff){
        Optional<Staff> staffOptional = staffRepo.findById(s_id);

        if(staffOptional.isPresent()){
            Staff existingStaff = staffOptional.get();
            existingStaff.setS_fName(updatestaff.getS_fName());
            existingStaff.setS_lName(updatestaff.getS_lName());
            existingStaff.setS_nic(updatestaff.getS_nic());
            existingStaff.setS_dob(updatestaff.getS_dob());
            existingStaff.setS_mobileNumber(updatestaff.getS_mobileNumber());
            existingStaff.setS_workNumber(updatestaff.getS_workNumber());
            existingStaff.setS_personalEmail(updatestaff.getS_personalEmail());
            existingStaff.setS_gender(updatestaff.getS_gender());
            existingStaff.setS_department(updatestaff.getS_department());
            existingStaff.setS_jobTitle(updatestaff.getS_jobTitle());
            existingStaff.setS_dob(updatestaff.getS_dob());
            existingStaff.setS_address(updatestaff.getS_address());
            existingStaff.setS_country(updatestaff.getS_country());
            existingStaff.setS_province(updatestaff.getS_province());
            existingStaff.setS_city(updatestaff.getS_city());
            existingStaff.setS_jobStartDate(updatestaff.getS_jobStartDate());
            existingStaff.setS_postalCode(updatestaff.getS_postalCode());
            existingStaff.setS_status(updatestaff.getS_status());

            Staff saveStaff = staffRepo.save(existingStaff);
            return new ApiResponse("Updated Successful");

        }

        else {
            return new ApiResponse("Staff Not Found");
        }
    }

    @Override
    public StaffDTO getStaffById(Integer s_id){
        Optional<Staff> staffOptional = staffRepo.findById(s_id);
        return modelMapper.map(staffOptional, StaffDTO.class);
    }

    @Override
    public StaffDTO getStaffByWorkEmail(String workEmail) {
        Staff staff = staffRepo.findByWorkEmail(workEmail);
        return modelMapper.map(staff, StaffDTO.class);
    }
    @Override
    public ApiResponse updatePassword(StaffDTO staffDTO){
        String newPassword = staffDTO.getNewPassword();
        String confirmPassword = staffDTO.getConfirmPassword();

        Staff staff = staffRepo.findByWorkEmail(staffDTO.getWorkEmail());

        if(staff != null){
            if (newPassword == null || confirmPassword == null) {
                return new ApiResponse("New password and confirm password cannot be null.");
            }

            if(!newPassword.equals(confirmPassword)){
                return new ApiResponse("New password and confirm password do not match. Please try again.");
            }
            staff.setS_password(newPassword);
            staffRepo.save(staff);
            return new ApiResponse("Password updated successfully. Please use the new password to log in.");
        }

        else{
            return new ApiResponse("Parent not found for given NIC");
        }
    }

    @Override
    public List<Staff> getAllStaff(){
        List<Staff>staffList = staffRepo.findAll();
        return modelMapper.map(staffList,new TypeToken<List<StaffDTO>>(){}.getType());
    }
}
