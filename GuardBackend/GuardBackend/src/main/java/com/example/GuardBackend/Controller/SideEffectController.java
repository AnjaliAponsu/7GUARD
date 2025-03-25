package com.example.GuardBackend.Controller;


import com.example.GuardBackend.Entity.SideEffectEntity;
import com.example.GuardBackend.ServiceImplementation.SideEffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/side-effect")
@CrossOrigin(origins = "http://localhost:3000")
public class SideEffectController {

    @Autowired
    private SideEffectService sideEffectService;

    @GetMapping("/view_side_effects/{vaccineName}")
    public ResponseEntity<SideEffectEntity> getVaccineDetails(@PathVariable String vaccineName) {
        try {
            SideEffectEntity entity = sideEffectService.getSideEffectDetails(vaccineName);
            if (entity == null) {
                return ResponseEntity.status(404).body(null); // Not found
            }
            return ResponseEntity.ok(entity); // Successfully found
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // If no record found, handle accordingly
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Server error
        }
    }

    @GetMapping("/admin/view_all")
    public ResponseEntity<?> getAllMedicationsForAdmin() {
        try {
            List<SideEffectEntity> medications = sideEffectService.getAllMedications();
            if (medications.isEmpty()) {
                return ResponseEntity.status(404).body("No medications found.");
            }
            return ResponseEntity.ok(medications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching medication records: " + e.getMessage());
        }
    }

    @PostMapping("/add_side_effects")
    public ResponseEntity<?> addSideEffect(@RequestBody SideEffectEntity sideEffectEntity) {
        try {
            SideEffectEntity savedEntity = sideEffectService.addSideEffect(sideEffectEntity);
            return ResponseEntity.status(201).body(savedEntity); // Created response
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Validation error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding side effect: " + e.getMessage());
        }
    }

    @PutMapping("/update_side_effects/{mId}")
    public ResponseEntity<?> updateSideEffect(@PathVariable Integer mId, @RequestBody SideEffectEntity sideEffectEntity) {
        try {
            SideEffectEntity updatedEntity = sideEffectService.updateSideEffect(mId, sideEffectEntity);
            return ResponseEntity.ok(updatedEntity);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input data: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Side effect not found with ID: " + mId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating side effect: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete_side_effects/{mId}")
    public ResponseEntity<?> deleteSideEffect(@PathVariable Integer mId) {
        try {
            String response = sideEffectService.deleteSideEffect(mId);
            return ResponseEntity.ok(response);  // Check if this returns a valid response
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Side effect not found with ID: " + mId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting side effect: " + e.getMessage());
        }
    }




}
