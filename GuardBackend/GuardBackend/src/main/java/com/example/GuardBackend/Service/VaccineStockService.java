package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.VaccineStockDTO;
import com.example.GuardBackend.Entity.VaccineStock;
import com.example.GuardBackend.Repository.VaccineStockRepository;
import com.example.GuardBackend.ServiceImplementation.IVaccineStockService;
import com.example.GuardBackend.Exception.VaccineAlreadyExistsException;
import com.example.GuardBackend.Exception.VaccineNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccineStockService implements IVaccineStockService {
    private final VaccineStockRepository vaccineListRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public VaccineStock addVaccineList(VaccineStock vaccineList) {
        if (vaccineAlreadyExists(vaccineList.getVlistid())) {
            throw new VaccineAlreadyExistsException(vaccineList.getVlistid() + " vaccine already exists");
        }
        return vaccineListRepository.save(vaccineList);
    }

    private boolean vaccineAlreadyExists(long vlistid) {
        return vaccineListRepository.existsById(vlistid);
    }

    @Override
    public List<VaccineStock> getVaccineList() {
        return vaccineListRepository.findAll();
    }

    @Override
    public void deleteVaccineListById(long vlistid) {
        if (!vaccineListRepository.existsById(vlistid)) {
            throw new VaccineNotFoundException("Sorry, vaccine not found");
        }
        vaccineListRepository.deleteById(vlistid);
    }

    @Override //Amada
    public List<VaccineStockDTO> getAllVaccines(){
        List<VaccineStock>vaccineList=vaccineListRepository.findAll();
        return modelMapper.map(vaccineList,new TypeToken<List<VaccineStockDTO>>(){}.getType());

    }

}
