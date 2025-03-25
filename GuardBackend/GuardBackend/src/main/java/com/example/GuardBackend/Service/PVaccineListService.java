package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.VaccineStockDTO;
import com.example.GuardBackend.Entity.PVaccineList;
import com.example.GuardBackend.Entity.VaccineStock;
import com.example.GuardBackend.Repository.PVaccineListRepository;
import com.example.GuardBackend.ServiceImplementation.IPVaccineListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PVaccineListService implements IPVaccineListService {
    private final PVaccineListRepository pVaccineListRepository;
    @Override
    public List<VaccineStockDTO> getVaccineStockDetails() {
        List<PVaccineList> pVaccineLists = pVaccineListRepository.findAll();
        return pVaccineLists.stream()
                .map(pVaccineList -> {
                    VaccineStock vaccineStock = pVaccineList.getVaccineStock();
                    return new VaccineStockDTO(pVaccineList.getPid(),vaccineStock.getVlistvaccine_name(),vaccineStock.getVlistquantity());
                }).collect(Collectors.toList());
    }
}
