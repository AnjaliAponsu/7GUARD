package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.Entity.SideEffectEntity;
import java.util.List;

public interface SideEffectService {
    List<SideEffectEntity> getSideEffects(); // Filtered by conditions

    List<SideEffectEntity> getAllMedications(); // Admin access to all records

    SideEffectEntity addSideEffect(SideEffectEntity sideEffectEntity);

    SideEffectEntity updateSideEffect(Integer mId, SideEffectEntity sideEffectEntity);

    String deleteSideEffect(Integer mId);

    SideEffectEntity getSideEffectDetails(String vaccineName); // Corrected method name


}
