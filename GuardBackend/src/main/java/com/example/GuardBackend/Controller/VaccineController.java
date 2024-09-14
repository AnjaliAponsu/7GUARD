package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.Vaccine;
import com.example.GuardBackend.Service.IVaccineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ImportanceOfVaccine")
@RequiredArgsConstructor
public class VaccineController {
    private final IVaccineService vaccineService;
    @GetMapping("/viewImportanceOfVaccine")
    public ResponseEntity <List<Vaccine>> getVaccines(){
        return new ResponseEntity<>(vaccineService.getVaccines(), HttpStatus.FOUND);
    }

    @PostMapping("/addImpOfVaccine")
    public Vaccine addVaccine(@RequestBody Vaccine vaccine){
        return vaccineService.addVaccine(vaccine);
    }
    @PutMapping("/updateimpOfVaccine/{id}")
    public Vaccine updateVaccine(@RequestBody Vaccine vaccine,@PathVariable Long id){
        return vaccineService.updateVaccine(vaccine, id);
    }

    @DeleteMapping("/deleteImpOfVaccine/{id}")
    public void deleteVaccineById(@PathVariable("id")long id){
        vaccineService.deleteVaccineById(id);
    }


    @GetMapping("/vaccine/{id}")
    public Vaccine getVaccineById(@PathVariable Long id){
        return vaccineService.getVaccineById(id);
    }


}
