package com.example.GuardBackend.Service;
import com.example.GuardBackend.DTO.PrescriptionDto;
import com.example.GuardBackend.Entity.Prescription;
import com.example.GuardBackend.Repository.PrescriptionRepo;
import com.example.GuardBackend.ServiceImplementation.PrescriptionServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor

public class PrescriptionService implements PrescriptionServiceImpl {

    @Autowired
    private PrescriptionRepo prescriptionRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PrescriptionDto savePrescription(PrescriptionDto prescriptionDto){
        prescriptionRepo.save(modelMapper.map(prescriptionDto, Prescription.class));
        return prescriptionDto;
    }

    @Override
    public PrescriptionDto getLatestPrescriptionId(@Valid Long cha_id) {
        Long latestPrescriptionId =prescriptionRepo.findLatestPrescriptionId(cha_id);
        if (latestPrescriptionId != null) {
            Optional<Prescription> prescriptionOptional = prescriptionRepo.findById(latestPrescriptionId);
            if (prescriptionOptional.isPresent()) {
                return modelMapper.map(prescriptionOptional.get(), PrescriptionDto.class);
            }
        }
        return null;
    }
    @Override
    public PrescriptionDto getPrescriptionByPrescriptionID(@Valid Long id){
        Prescription prescription=prescriptionRepo.getPrescriptionByPrescriptionID(id);
        return modelMapper.map(prescription,PrescriptionDto.class);
    }
    @Override
    public PrescriptionDto updatePrescriptionByID(@Valid Long id , @Valid PrescriptionDto prescriptionDto){
        Prescription prescription=prescriptionRepo.updatePrescriptionByID(id);
        prescriptionRepo.save(modelMapper.map(prescriptionDto, Prescription.class));
        return prescriptionDto;
    }
    @Override
    public void deletePrescription(Long id) {
        prescriptionRepo.deleteById(id);
    }

    @Override
    public List<PrescriptionDto> getAllPrescriptions(){
        List<Prescription>prescriptionList=prescriptionRepo.findAll();
        return modelMapper.map(prescriptionList,new TypeToken<List<PrescriptionDto>>(){}.getType());

    }

}

