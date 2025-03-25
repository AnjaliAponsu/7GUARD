package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.BmiDTO;
import com.example.GuardBackend.Entity.Bmi;
import com.example.GuardBackend.Service.BmiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bmi")
public class BmiController {

    @Autowired
    private BmiService bmiService;

    @PostMapping
    public ResponseEntity<Bmi> createBmi(@RequestBody BmiDTO bmiDTO) {
        Bmi bmi = bmiService.createBmi(bmiDTO);
        return ResponseEntity.ok(bmi);
    }



    @GetMapping("/byChdrId")
    public ResponseEntity<List<BmiDTO>> getBmiByChdrId(@RequestParam Integer chdrId) {
        List<BmiDTO> bmiList = bmiService.getBmiByChdrId(chdrId);
        if (bmiList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bmiList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bmi> getBmiById(@PathVariable Integer id) {
        return bmiService.getBmiById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
