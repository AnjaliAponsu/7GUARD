package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.Entity.VaccineStock;

import java.util.List;

public interface IVaccineStockService {
    VaccineStock addVaccineList(VaccineStock vaccineList);
    List<VaccineStock> getVaccineList();
    void deleteVaccineListById(long vlistid);
}
