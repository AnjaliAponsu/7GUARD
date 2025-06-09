package com.example.GuardBackend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Data
@Setter
public class ImpOfVaccineScanViewServiceDTO {



    private Long id;
    private String Scan;
    private String vaccine_name;
    private String impofWeekRange;
    private String email;
    private String status;
    private Date scanDate;
    private String age;
    private String description;
    private Long chaID;
    private Long chdrID;
    private String vaccinePurpose;

}