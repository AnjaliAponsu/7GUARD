package com.example.GuardBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String chdr_id; // Changed from chdrId to chdr_id
    private double height;
    private double weight;
    private String date;
    private int age;
}
