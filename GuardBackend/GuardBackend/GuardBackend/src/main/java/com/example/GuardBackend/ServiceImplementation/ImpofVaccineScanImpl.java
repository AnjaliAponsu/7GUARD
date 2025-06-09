package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.Entity.Reminder;
import com.example.GuardBackend.Entity.VaccineScanView;
import java.util.List;

public interface ImpofVaccineScanImpl {
    List<VaccineScanView> getAllVaccineScans();
    void fetchAndSaveData();
    String deleteDetails(Long chdrID);
    List<Reminder> getAllDetails();
    VaccineScanView saveDetails(VaccineScanView vaccineScanView);
    List<VaccineScanView> AllDetails();

}