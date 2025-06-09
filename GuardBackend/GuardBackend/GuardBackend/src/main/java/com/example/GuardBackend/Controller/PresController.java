package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.PrescriptionDto;
import com.example.GuardBackend.ServiceImplementation.PrescriptionServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/Prescription")
@CrossOrigin
public class PresController {

    @Autowired
    private PrescriptionServiceImpl prescriptionServiceImpl;



    @PostMapping("/savePrescription")
    public PrescriptionDto savePrescription(@Valid @RequestBody PrescriptionDto prescriptionDto){

        return prescriptionServiceImpl.savePrescription(prescriptionDto);
    }




    @GetMapping("/getLatestPrescriptionId/{cha_id}")//ok
    public ResponseEntity<PrescriptionDto> getLatestPrescriptionId(@Valid @PathVariable Long cha_id) {
        PrescriptionDto latestPrescription = prescriptionServiceImpl.getLatestPrescriptionId(cha_id);
        if (latestPrescription != null) {
            return ResponseEntity.ok(latestPrescription);
        } else {
            return null;
        }
    }

    @GetMapping("/getPrescriptionByPrescriptionID/{id}")//ok
    public PrescriptionDto getPrescriptionByPrescriptionID(@Valid @PathVariable Long id) {
        return prescriptionServiceImpl.getPrescriptionByPrescriptionID(id);
    }

    @PutMapping("/updatePrescriptionByID/{id}")
    public PrescriptionDto updatePrescriptionByID(@Valid @PathVariable Long id, @Valid  @RequestBody PrescriptionDto prescriptionDto){
        return prescriptionServiceImpl.updatePrescriptionByID(id,prescriptionDto);
    }

    @DeleteMapping("/deletePrescription/{id}")
    public ResponseEntity<String> deletePrescription(@PathVariable Long id) {
        prescriptionServiceImpl.deletePrescription(id);
        return ResponseEntity.ok("Prescription deleted successfully");
    }
    @GetMapping("/getAllPrescriptions")//no use
    public List<PrescriptionDto> getAllPrescriptions() {


        return prescriptionServiceImpl.getAllPrescriptions();
    }


}

