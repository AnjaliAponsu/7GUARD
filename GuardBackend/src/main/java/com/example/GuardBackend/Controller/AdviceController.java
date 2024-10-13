package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.Service.AdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advice")
public class AdviceController {

    private final AdviceService adviceService;

    @Autowired
    public AdviceController(AdviceService adviceService) {
        this.adviceService = adviceService;
    }

    // Admin can create new advice
    @PostMapping("/add")
    public Advice createAdvice(@RequestBody Advice advice) {
        return adviceService.createAdvice(advice);
    }

    // Admin can get all advice
    @GetMapping("/getAllAdvice")
    public List<Advice> getAllAdvice() {
        return adviceService.getAllAdvice();
    }

    // Admin can get advice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Advice> getAdviceById(@PathVariable Long id) {
        return adviceService.getAdviceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin can update advice
    @PutMapping("/{id}")
    public ResponseEntity<Advice> updateAdvice(@PathVariable Long id, @RequestBody Advice advice) {
        return ResponseEntity.ok(adviceService.updateAdvice(id, advice));
    }

    // Admin can delete advice
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvice(@PathVariable Long id) {
        adviceService.deleteAdvice(id);
        return ResponseEntity.noContent().build();
    }
}
