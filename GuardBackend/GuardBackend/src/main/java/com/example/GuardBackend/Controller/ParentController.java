package com.example.GuardBackend.Controller;

import com.example.GuardBackend.DTO.ParentDTO;
import com.example.GuardBackend.DTO.ParentOtpDTO;
import com.example.GuardBackend.Entity.Parent;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.Response.ParentLoginResponse;
import com.example.GuardBackend.ServiceImplementation.ChildService;
import com.example.GuardBackend.Service.LoginService;
import com.example.GuardBackend.Service.ParentServiceIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/")

public class ParentController {
    @Autowired
    private ParentServiceIMPL parentServiceIMPL;

    @Autowired
    private LoginService loginService;

    @Autowired
    private ChildService childService;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/saveParent")
    public ResponseEntity<ApiResponse>saveParent (@RequestBody ParentDTO parentDTO){
        parentServiceIMPL.addParent(parentDTO);
        return ResponseEntity.ok(new ApiResponse("Parent saved successfully. OTP sent"));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/loginParent")
    public ResponseEntity<ParentLoginResponse>loginParent (@RequestBody ParentOtpDTO parentOtpDTO){
        ParentLoginResponse response = loginService.loginParent(parentOtpDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/updatePassword")
    public ResponseEntity<ApiResponse>updatePassword (@RequestBody ParentOtpDTO parentOtpDTO){
        ApiResponse response = loginService.updatePassword(parentOtpDTO);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getParents")
    public ResponseEntity<List<Parent>> getParents(){
        List<Parent> parent = parentServiceIMPL.getAllParents();
        return ResponseEntity.ok(parent);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/checkParentNIC")
    public ResponseEntity<Boolean> checkParentNIC(@RequestParam String parentNic) {
        boolean exists = childService.isParentNICExists(parentNic);
        return ResponseEntity.ok(exists);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping("/updateParent/{parentNic}")
    public ResponseEntity<ApiResponse>updateParent(@PathVariable String parentNic, @RequestBody Parent parentDTO){
        ApiResponse response = parentServiceIMPL.updateParent(parentNic, parentDTO);
        return ResponseEntity.ok(response);

    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getParentByNic/{parentNic}")
    public ResponseEntity<ParentDTO> getParentByNic(@PathVariable String parentNic) {
        return ResponseEntity.ok(parentServiceIMPL.getParentByNic(parentNic));
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping( "/getParentByParentNIC/{parentNic}") //Amada
    public ParentDTO getParentByParentNIC (@PathVariable String parentNic){
        return parentServiceIMPL.getParentByParentNIC(parentNic);}
}
