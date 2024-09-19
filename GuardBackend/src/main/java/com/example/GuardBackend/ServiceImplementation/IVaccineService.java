package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.Vaccine;

import java.util.List;

public interface IVaccineService{
    Vaccine addVaccine(Vaccine vaccine);
    List<Vaccine> getVaccines();
    Vaccine updateVaccine (Vaccine vaccine, Long id);
    Vaccine getVaccineById(Long id);
    void deleteVaccineById(Long id);

}
