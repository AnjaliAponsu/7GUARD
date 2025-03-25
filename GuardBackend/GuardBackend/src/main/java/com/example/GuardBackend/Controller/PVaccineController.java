package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.VaccineStockDTO;
import com.example.GuardBackend.ServiceImplementation.IPVaccineListService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RequiredArgsConstructor
@RestController
@RequestMapping("/pvl")
public class PVaccineController {
    @Autowired
    private final IPVaccineListService ipVaccineListService;

    @GetMapping("/gpvl")
    public ResponseEntity<List<VaccineStockDTO>> getVaccineStockDetails() {
        List<VaccineStockDTO> vaccineStockDetails = ipVaccineListService.getVaccineStockDetails();
        return new ResponseEntity<>(vaccineStockDetails, HttpStatus.OK);
    }

}
