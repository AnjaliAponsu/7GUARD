package com.example.GuardBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;
@Data
@AllArgsConstructor
public class ImpOfVaccineDTO {
    private long impofid;
    private String impofvaccine_name;
    private List<ScanDTO> scan;

    @Data
    @AllArgsConstructor
    public static class ScanDTO {
        private Long id;
        private Long scan;
        private Long cha_id;
        private Long CHDR_id;
    }
}
