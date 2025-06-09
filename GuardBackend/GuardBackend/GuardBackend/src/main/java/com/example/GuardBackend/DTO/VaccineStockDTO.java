package com.example.GuardBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VaccineStockDTO {
    private long pid;
    private String vlistvaccine_name;
    private long vlistquantity;

}
