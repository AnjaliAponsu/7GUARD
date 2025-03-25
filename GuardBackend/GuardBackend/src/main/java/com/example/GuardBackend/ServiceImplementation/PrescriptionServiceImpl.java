package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.PrescriptionDto;
import jakarta.validation.Valid;
import java.util.List;

public interface PrescriptionServiceImpl {
    PrescriptionDto savePrescription(PrescriptionDto prescriptionDto);
    PrescriptionDto getLatestPrescriptionId(@Valid Long cha_id);
    PrescriptionDto getPrescriptionByPrescriptionID(@Valid Long id);
    PrescriptionDto updatePrescriptionByID(@Valid Long id , @Valid PrescriptionDto prescriptionDto);
    void deletePrescription(Long id);
    List<PrescriptionDto> getAllPrescriptions();
}
