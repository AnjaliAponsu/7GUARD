package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ChdrDTO;
import jakarta.validation.Valid;


public interface ChdrService {
    ChdrDTO getChildByChildCHDR(@Valid Integer child_id);

    ChdrDTO getChildByChildId(Integer child_id); //Dewindi


}
