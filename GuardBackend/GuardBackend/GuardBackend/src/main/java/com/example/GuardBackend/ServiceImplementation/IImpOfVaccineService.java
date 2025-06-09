package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ImpOfVaccineDTO;
import com.example.GuardBackend.Entity.ImpOfVaccine;
import java.util.List;

public interface IImpOfVaccineService {
    ImpOfVaccine addVaccine(ImpOfVaccine vaccine);
    List<ImpOfVaccine> getVaccines();
    ImpOfVaccine updateVaccine (ImpOfVaccine vaccine, Long impofid);
    void deleteVaccineById(Long impofid);
    ImpOfVaccine getVaccineById(Long impofid);
    List<ImpOfVaccineDTO> getCHDRVaccineDetailsById(Long CHDR_id);

}
