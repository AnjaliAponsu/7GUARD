package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Vaccine;

import java.util.List;

public interface IVaccineService{
    Vaccine addVaccine(Vaccine vaccine);
    List<Vaccine> getVaccines();
    Vaccine updateVaccine (Vaccine vaccine, Long id);
    Vaccine getVaccineById(Long id);
    void deleteVaccineById(Long id);

}
