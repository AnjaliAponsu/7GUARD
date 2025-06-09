package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.ScanDto;
import java.util.List;

public interface ScanServiceImpl {
    void saveScan(ScanDto scanDto);
    List<ScanDto> getInjectedVaccine();
}
