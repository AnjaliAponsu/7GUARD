package com.example.GuardBackend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScanDto {


    private Long id;
    private Long cha_id;
    private Long CHDR_id;
    private String vaccine_purpose;
    private String vaccine_name;
    private Long scan;
    private Date date;
    private Long impofid;
    private String email;
}

