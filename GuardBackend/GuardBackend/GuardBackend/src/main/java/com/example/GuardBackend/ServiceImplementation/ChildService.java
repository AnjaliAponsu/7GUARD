package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ChildDTO;
import com.example.GuardBackend.Entity.Child;
import com.example.GuardBackend.Response.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

public interface ChildService {
    void addChild(ChildDTO childDTO);

    List<String> getDoctorNames();

    boolean isParentNICExists(String parentNic);
    ApiResponse updateChild (Integer child_id, Child updateChild);

    ChildDTO getChildById(Integer childId);

    List<Child> getChildren();
    List<Map<String, Object>> findChildByParentNic (String parentNic);

    public List<ChildDTO> getAllChildren();//Amada
    List<ChildDTO> getChildByParentNic(@Valid String parentNic);


}
