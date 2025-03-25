package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.ChildDTO;
import com.example.GuardBackend.Entity.Child;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.ServiceImplementation.ChildService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/")

public class ChildController {
    @Autowired
    private ChildService childService;

    @PostMapping("/saveChild")
    public ResponseEntity<?> saveChild (@RequestBody ChildDTO childDTO) {
        childService.addChild(childDTO);
        return ResponseEntity.ok(new ApiResponse("Child saved successfully"));

    }

    @PutMapping("/updateChild/{child_id}")
    public ResponseEntity<ApiResponse>updateChild(@PathVariable Integer child_id, @RequestBody Child childDTO){
        ApiResponse response = childService.updateChild(child_id, childDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getChildrenByNic/{parentNic}")
    public ResponseEntity<List<Map<String, Object>>> findChildrenByParentNic(@PathVariable String parentNic) {
        List<Map<String, Object>> children = childService.findChildByParentNic(parentNic);
        if (children.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(children);
    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getChildById/{child_id}")
    public ResponseEntity<ChildDTO> getChildById(@PathVariable Integer child_id) {
        return ResponseEntity.ok(childService.getChildById(child_id));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getAllChildren")
    public ResponseEntity<List<Child>> getChildren(){
        List<Child> child = childService.getChildren();
        return ResponseEntity.ok(child);
    }

    @GetMapping("/getChildByParentNic/{parentNic}")//Amada
    public List<ChildDTO>getChildByParentNic(@Valid @PathVariable String parentNic) {
        return childService.getChildByParentNic(parentNic);
    }
}
