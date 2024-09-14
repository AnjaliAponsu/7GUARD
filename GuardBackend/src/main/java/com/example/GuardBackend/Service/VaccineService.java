package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Vaccine;
import com.example.GuardBackend.Repository.VaccineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccineService implements IVaccineService{
    private final VaccineRepository vaccineRepository;

    @Override
    public List<Vaccine> getVaccines() {
        return vaccineRepository.findAll();
    }

    @Override
    public Vaccine addVaccine(Vaccine vaccine) {
        if (vaccineAlreadyExists(vaccine.getId())){
            throw new VaccineAlreadyExistsException(vaccine.getId()+" vaccine already exists");
        }
        return vaccineRepository.save(vaccine);
    }

    private boolean vaccineAlreadyExists(long id) {
        return vaccineRepository.findById(id).isPresent();
    }

    @Override
    public Vaccine updateVaccine(Vaccine vaccine, Long id) {
        return vaccineRepository.findById(id).map(vaccine1 -> {

            vaccine1.setVaccine_name(vaccine.getVaccine_name());
            vaccine1.setYear_range(vaccine. getYear_range());
            vaccine1.setDescription(vaccine.getDescription());
            return vaccineRepository.save(vaccine1);

        }).orElseThrow(() -> new VaccineNotFoundException("Sorry this vaccine could not be found"));
    }

    @Override
    public Vaccine getVaccineById(Long id) {
        return vaccineRepository.findById(id).orElseThrow(()-> new VaccineNotFoundException("Sorry,no vaccine found with the id :" +id)) ;
    }

    @Override
    public void deleteVaccineById(Long id) {
        if (!vaccineRepository.existsById(id)){
            throw new VaccineNotFoundException("Sorry, vaccine not found");
        }
        vaccineRepository.deleteById(id);
    }


}
