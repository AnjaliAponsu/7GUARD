package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.VaccineStockDTO;
import java.util.List;

public interface IPVaccineListService {
    List<VaccineStockDTO> getVaccineStockDetails();
}
