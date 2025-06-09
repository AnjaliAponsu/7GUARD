package com.example.GuardBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class SideEffectDTO {

    private int mid;
    private String sideEffect; // Updated to camelCase
    private String medication;
    private String vaccineName;

}
