package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.SideEffectEntity;
import com.example.GuardBackend.Repository.SideEffectRepository;
import com.example.GuardBackend.ServiceImplementation.SideEffectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SideEffectServiceImpl implements SideEffectService {
    @Autowired
    private  ModelMapper modelMapper;
    @Autowired
    private SideEffectRepository sideEffectRepository;

    @Override
    public List<SideEffectEntity> getSideEffects() {
        return List.of();
    }

    @Override
    public List<SideEffectEntity> getAllMedications() {
        return sideEffectRepository.findAll(); // Simply return all records
    }

    @Override
    public SideEffectEntity addSideEffect(SideEffectEntity sideEffectEntity) {
        validateSideEffect(sideEffectEntity);
        return sideEffectRepository.save(sideEffectEntity);
    }

    @Override
    public SideEffectEntity updateSideEffect(Integer mId, SideEffectEntity sideEffectEntity) {
        validateSideEffect(sideEffectEntity);

        // Find the existing entity
        SideEffectEntity existingEffect = sideEffectRepository.findById(mId)
                .orElseThrow(() -> new RuntimeException("Side effect not found with ID: " + mId));

        existingEffect.setVaccineName(sideEffectEntity.getVaccineName());
        existingEffect.setSideEffect(sideEffectEntity.getSideEffect());
        existingEffect.setMedication(sideEffectEntity.getMedication());

        return sideEffectRepository.save(existingEffect);
    }

    @Override
    public String deleteSideEffect(Integer mId) {
        SideEffectEntity existingEffect = sideEffectRepository.findById(mId)
                .orElseThrow(() -> new RuntimeException("Side effect not found with ID: " + mId));
        sideEffectRepository.delete(existingEffect);
        return "Side effect with ID " + mId + " has been deleted.";
    }

    @Override
    public SideEffectEntity getSideEffectDetails(String vaccineName) {
        SideEffectEntity entity = sideEffectRepository.findByVaccineName(vaccineName);
        if (entity == null) {
            return null; // Return null if no record found
        }
        return new SideEffectEntity(
                entity.getMId(),
                entity.getVaccineName(),
                entity.getSideEffect(),
                entity.getMedication()
        );
    }

    private void validateSideEffect(SideEffectEntity sideEffectEntity) {
        if (sideEffectEntity.getVaccineName() == null || sideEffectEntity.getVaccineName().isEmpty()) {
            throw new IllegalArgumentException("Vaccine name is required.");
        }
        if (sideEffectEntity.getSideEffect() == null || sideEffectEntity.getSideEffect().isEmpty()) {
            throw new IllegalArgumentException("Side effect is required.");
        }
        if (sideEffectEntity.getMedication() == null || sideEffectEntity.getMedication().isEmpty()) {
            throw new IllegalArgumentException("Medication is required.");
        }
    }


}
