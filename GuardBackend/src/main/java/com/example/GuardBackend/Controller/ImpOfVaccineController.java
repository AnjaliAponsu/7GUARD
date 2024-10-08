package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.ImpOfVaccine;
import com.example.GuardBackend.Service.ImpOfVaccineService;
import com.example.GuardBackend.ServiceImplementation.IImpOfVaccineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/iov")
@RequiredArgsConstructor
public class ImpOfVaccineController {
    private final IImpOfVaccineService vaccineService;
    @GetMapping("/viov")
    public ResponseEntity <List<ImpOfVaccine>> getVaccines(){
        return new ResponseEntity<>(vaccineService.getVaccines(), HttpStatus.OK);
    }

    @PostMapping("/aiov")
    public ImpOfVaccine addVaccine(@RequestBody ImpOfVaccine vaccine){
        return vaccineService.addVaccine(vaccine);
    }
    @PutMapping("/uiov/{impofid}")
    public ImpOfVaccine updateVaccine(@RequestBody ImpOfVaccine vaccine, @PathVariable Long impofid){
        return vaccineService.updateVaccine(vaccine, impofid);
    }

    @DeleteMapping("/diov/{impofid}")
    public void deleteVaccineById(@PathVariable long impofid){
        vaccineService.deleteVaccineById(impofid);
    }


    @GetMapping("/vaccine/{impofid}")
    public ImpOfVaccine getVaccineById(@PathVariable Long impofid){
        return vaccineService.getVaccineById(impofid);
    }

}
