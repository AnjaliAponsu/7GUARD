package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.ScanDto;
import com.example.GuardBackend.ServiceImplementation.ScanServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/Scan")
@CrossOrigin
public class ScanController {

    @Autowired
    private ScanServiceImpl scanServiceImpl;

    @PostMapping("/add")
    public ResponseEntity<String> addScan(@RequestBody ScanDto scanDto) {
        if (scanDto.getImpofid() == null) {
            return ResponseEntity.badRequest().body("impofid cannot be null");
        }
        scanServiceImpl.saveScan(scanDto);
        return ResponseEntity.ok("Scan added successfully");
    }

    @GetMapping("/getInjectedVaccine")
    public List<ScanDto> getInjectedVaccine() {


        return scanServiceImpl.getInjectedVaccine();
    }


}
