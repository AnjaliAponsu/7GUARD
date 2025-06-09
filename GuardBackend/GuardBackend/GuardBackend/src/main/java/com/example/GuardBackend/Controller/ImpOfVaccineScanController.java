package com.example.GuardBackend.Controller;


import com.example.GuardBackend.Entity.Reminder;
import com.example.GuardBackend.Entity.VaccineScanView;
import com.example.GuardBackend.Service.ImpOfVaccineScanViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/reminder")
@CrossOrigin(origins = "http://localhost:3000")
public class ImpOfVaccineScanController {

    @Autowired
    private ImpOfVaccineScanViewService service;


    @GetMapping("/getAllVaccineScans")
    public ResponseEntity<List<VaccineScanView>> getAllVaccineScans() {
        List<VaccineScanView> vaccineScans = service.getAllVaccineScans();
        return ResponseEntity.ok(vaccineScans);
    }

    @GetMapping("/fetch-and-save")
    public String fetchAndSaveData() {
        service.fetchAndSaveData();
        return "Data fetched and saved successfully!";
    }


    @GetMapping("/viewreminder")
    public List<Reminder> getAllDetails() {
        return service.getAllDetails();
    }

    @DeleteMapping("/deletereminder/{chdrid}")
    public String deleteRoomDetails(@PathVariable("chdrid") Long chdrId) {
        return service.deleteDetails(chdrId);
    }

    @PostMapping("/save")
    public VaccineScanView saveDetails(@RequestBody VaccineScanView vaccineScanView){
        return service.saveDetails(vaccineScanView);
    }

    @GetMapping("/viewallreminder")
    public List<VaccineScanView> AllDetails() {
        return service.AllDetails();
    }




}