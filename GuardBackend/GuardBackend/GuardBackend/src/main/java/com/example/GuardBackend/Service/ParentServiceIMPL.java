package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.ParentDTO;
import com.example.GuardBackend.Entity.Parent;
import com.example.GuardBackend.Repository.ChildRepo;
import com.example.GuardBackend.Repository.ParentOtpRepo;
import com.example.GuardBackend.Repository.ParentRepo;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.ServiceImplementation.ParentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ParentServiceIMPL implements ParentService {
    @Autowired
    private ParentRepo parentRepo;

    @Autowired
    private ParentOtpRepo parentOtpRepo;

    @Autowired
    private ChildRepo childRepo;

    private final ModelMapper modelMapper;

    @Autowired
    private OtpService otpService;

    @Autowired
    public ParentServiceIMPL(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public void addParent(ParentDTO parentDTO) {
        Parent parent = modelMapper.map(parentDTO, Parent.class);
        Parent savedParent = parentRepo.save(parent);

        String parentNic = savedParent.getParentNic();

        otpService.sendOtpService(savedParent.getP_email(), parentNic);

    }

    @Override
    public void sendOtpToParent(String email, String parentNic) {
    }

    @Override
    public List<Parent> getAllParents(){
        List<Parent>parentList = parentRepo.findAll();
        return modelMapper.map(parentList,new TypeToken<List<ParentDTO>>(){}.getType());

    }
    @Transactional
    public ApiResponse updateParent (String parentNic, Parent updateParent){
        Optional<Parent>parentOptional = parentRepo.findByParentNic(parentNic);

        if(parentOptional.isPresent()){
            Parent existingParent = parentOptional.get();
            existingParent.setP_fName(updateParent.getP_fName());
            existingParent.setP_lName(updateParent.getP_lName());
            existingParent.setParentNic(updateParent.getParentNic());
            existingParent.setP_mobileNumber(updateParent.getP_mobileNumber());
            existingParent.setP_email(updateParent.getP_email());
            existingParent.setP_gender(updateParent.getP_gender());
            existingParent.setP_dob(updateParent.getP_dob());
            existingParent.setP_address(updateParent.getP_address());
            existingParent.setP_country(updateParent.getP_country());
            existingParent.setP_province(updateParent.getP_province());
            existingParent.setP_city(updateParent.getP_city());
            existingParent.setP_postalCode(updateParent.getP_postalCode());
            existingParent.setP_relationship(updateParent.getP_relationship());
            existingParent.setEmergencyContactName(updateParent.getEmergencyContactName());
            existingParent.setEmergencyContactRelation(updateParent.getEmergencyContactRelation());
            existingParent.setEmergencyContactPhone(updateParent.getEmergencyContactPhone());

            Parent saveParent = parentRepo.save(existingParent);

            String newParentNic = updateParent.getParentNic();
            if (!parentNic.equals(newParentNic)) { // Only update if the parentNic changes
                parentOtpRepo.updateParentNic(parentNic, newParentNic);
                System.out.println(newParentNic);
                childRepo.updateParentNic(parentNic, newParentNic);
            }


            return new ApiResponse ("Updated successfully");

        }

        else{
            return new ApiResponse("Parent Not found");
        }

    }

    public ParentDTO getParentByNic (String parentNic){
        Optional<Parent> parentOptional = parentRepo.findByParentNic(parentNic);
        return modelMapper.map(parentOptional, ParentDTO.class);
    }

    @Override //Amada
    public List<ParentDTO> getAllParent(){
        List<Parent>parentList=parentRepo.findAll();
        return modelMapper.map(parentList,new TypeToken<List<ParentDTO>>(){}.getType());

    }
    @Override //Amada
    public ParentDTO getParentByParentNIC(@Valid String parentNic){
        Parent parent=parentRepo.getParentByParentNIC(parentNic);
        return modelMapper.map(parent, ParentDTO.class);
    }

}
