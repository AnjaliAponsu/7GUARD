package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.AdviceDTO;
import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.ServiceImplementation.AdviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advice")
@CrossOrigin(origins = "http://localhost:3000")
public class AdviceController {

    @Autowired
    private AdviceService adviceService;

    @PostMapping("/saveAdvice")
    public ResponseEntity<?> createAdvice(@RequestBody AdviceDTO adviceDTO) {
        adviceService.saveAdvice(adviceDTO);
        return ResponseEntity.ok("Saved successfully");
    }

    // Constructor injection
    @Autowired
    public AdviceController(AdviceService adviceService) {
        this.adviceService = adviceService;
    }

    @GetMapping("/all")
    public List<Advice> getAllAdvice() {
        return adviceService.getAllAdvice();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdvice(@PathVariable Integer id) {
        adviceService.deleteAdvice(id);
        return ResponseEntity.ok("Advice deleted successfully");
    }

    @PutMapping("/updateAdviceByID/{id}")
    public AdviceDTO updateAdviceById(@Valid @PathVariable Integer id,@Valid @RequestBody AdviceDTO adviceDTO){
        return adviceService.updateAdviceById(id,adviceDTO);

    }

    @GetMapping( "/getAdviceByID/{id}")
    public AdviceDTO getById (@Valid @PathVariable  Integer id){
        return adviceService.getById (id);}



    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping( "/getAdviceByStatus/{bmiStatus}")
    public AdviceDTO getByBmiStatus (@Valid @PathVariable  String bmiStatus){
        return adviceService.getByBmiStatus(bmiStatus);
    }

}





