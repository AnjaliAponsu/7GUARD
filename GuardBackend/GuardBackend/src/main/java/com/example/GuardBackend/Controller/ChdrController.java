package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.ChdrDTO;
import com.example.GuardBackend.Service.ChdrServiceIMPL;
import com.example.GuardBackend.ServiceImplementation.ChdrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "7Guard/Chdr")
@CrossOrigin
public class ChdrController {

    @Autowired
    private ChdrServiceIMPL chdrServiceIMPL;
    @Autowired
    private ChdrService chdrService;

    @GetMapping( "/getChildByChildCHDR/{child_id}") //Amada
    public ChdrDTO getChildByChildCHDR(@PathVariable Integer child_id){
        return chdrServiceIMPL.getChildByChildCHDR(child_id);
    }

    @GetMapping("/getChildIdByChildCHDR/{chdr_id}")
    public ChdrDTO getChildIdByChildCHDR(@PathVariable Integer chdr_id) {
        return chdrServiceIMPL.getChildIdByChildCHDR(chdr_id);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")//Dewindi
    @GetMapping("/getChildByChildId/{child_id}")
    public ResponseEntity<ChdrDTO> getChildByChildId(@PathVariable Integer child_id) {
        return ResponseEntity.ok(chdrService.getChildByChildId(child_id));
    }



}
