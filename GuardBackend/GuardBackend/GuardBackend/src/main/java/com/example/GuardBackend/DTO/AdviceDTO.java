package com.example.GuardBackend.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdviceDTO {
    private Integer id;

    private String bmiStatus;


    private String message;
}
