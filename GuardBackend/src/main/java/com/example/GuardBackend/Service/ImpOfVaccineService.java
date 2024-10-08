package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.ImpOfVaccine;
import com.example.GuardBackend.Repository.ImpOfVaccineRepository;
import com.example.GuardBackend.ServiceImplementation.IImpOfVaccineService;
import com.example.GuardBackend.ServiceImplementation.VaccineAlreadyExistsException;
import com.example.GuardBackend.ServiceImplementation.VaccineNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImpOfVaccineService implements IImpOfVaccineService {
    private final ImpOfVaccineRepository vaccineRepository;

    @Override
    public List<ImpOfVaccine> getVaccines() {
        return vaccineRepository.findAll();
    }

    @Override
    public ImpOfVaccine addVaccine(ImpOfVaccine vaccine) {
        if (vaccineAlreadyExists(vaccine.getImpofid())){
            throw new VaccineAlreadyExistsException(vaccine.getImpofid()+" vaccine already exists");
        }
        return vaccineRepository.save(vaccine);
    }

    private boolean vaccineAlreadyExists(long impofid) {
        return vaccineRepository.findById(impofid).isPresent();
    }

    @Override
    public ImpOfVaccine updateVaccine(ImpOfVaccine vaccine, Long impofid) {
        return vaccineRepository.findById(impofid).map(vaccine1 -> {

            vaccine1.setImpofvaccine_name(vaccine.getImpofvaccine_name());
            vaccine1.setImpofAge(vaccine. getImpofAge());
            vaccine1.setImpofdescription(vaccine.getImpofdescription());
            return vaccineRepository.save(vaccine1);

        }).orElseThrow(() -> new VaccineNotFoundException("Sorry this vaccine could not be found"));
    }

    @Override
    public ImpOfVaccine getVaccineById(Long impofid) {
        return vaccineRepository.findById(impofid).orElseThrow(()-> new VaccineNotFoundException("Sorry,no vaccine found with the id :" +impofid)) ;
    }

    @Override
    public void deleteVaccineById(Long impofid) {
        if (!vaccineRepository.existsById(impofid)){
            throw new VaccineNotFoundException("Sorry, vaccine not found");
        }
        vaccineRepository.deleteById(impofid);
    }


}
