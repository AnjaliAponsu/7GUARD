package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ParentDTO;
import com.example.GuardBackend.Entity.Parent;
import com.example.GuardBackend.Response.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;

public interface ParentService {
    void addParent(ParentDTO parentDTO);
    void sendOtpToParent(String email, String parentNic);
    List<Parent> getAllParents();
    ApiResponse updateParent(String parentNic, Parent parentDTO);

    ParentDTO getParentByNic(String parentNic);

    List<ParentDTO> getAllParent();//Amada

    public ParentDTO getParentByParentNIC(@Valid String parentNic); //Amada
}
