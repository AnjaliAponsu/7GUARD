package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.VaccineStock;
import com.example.GuardBackend.ServiceImplementation.IVaccineStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/vl")
@RequiredArgsConstructor
public class VaccineStockController {
    private final IVaccineStockService vaccineListService;

    @GetMapping("/gvl")
    public ResponseEntity<List<VaccineStock>> getVaccineList() {
        return new ResponseEntity<>(vaccineListService.getVaccineList(), HttpStatus.OK);
    }

    @PostMapping("/avl")
    public ResponseEntity<VaccineStock> addVaccineList(@RequestBody VaccineStock vaccineList) {
        return new ResponseEntity<>(vaccineListService.addVaccineList(vaccineList), HttpStatus.CREATED);
    }

    @DeleteMapping("/dvl/{vlistid}")
    public ResponseEntity<String> deleteVaccineListById(@PathVariable long vlistid) {
        vaccineListService.deleteVaccineListById(vlistid);
        return new ResponseEntity<>("Vaccine deleted successfully", HttpStatus.OK);
    }
}
