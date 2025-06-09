package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.ScanDto;
import com.example.GuardBackend.Entity.ImpOfVaccine;
import com.example.GuardBackend.Entity.Scan;
import com.example.GuardBackend.Repository.ImpOfVaccineRepository;
import com.example.GuardBackend.Repository.ScanRepo;
import com.example.GuardBackend.ServiceImplementation.ScanServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ScanService implements ScanServiceImpl {

    @Autowired
    private ScanRepo scanRepo;

    @Autowired
    private ImpOfVaccineRepository impOfVaccineRepository;

    @Autowired
    private ModelMapper modelMapper;




    @Override// Save Scan
    public void saveScan(ScanDto scanDto) {
        Long impofid=scanDto.getImpofid();
        Optional<ImpOfVaccine>impOfVaccineOptional=impOfVaccineRepository.findById(impofid);
        ImpOfVaccine impOfVaccine=impOfVaccineOptional.get();

        if (scanDto.getImpofid() == null) {
            throw new IllegalArgumentException("impofid cannot be null");
        }
        Scan scan = modelMapper.map(scanDto,Scan.class);
        scan.setImpOfVaccine(impOfVaccine);
        scanRepo.save(scan);
    }

    @Override
    public List<ScanDto> getInjectedVaccine(){
        List<Scan>scanList=scanRepo.findAll();
        return modelMapper.map(scanList,new TypeToken<List<ScanDto>>(){}.getType());

    }




}
