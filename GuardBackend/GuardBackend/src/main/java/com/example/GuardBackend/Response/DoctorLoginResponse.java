package com.example.GuardBackend.Response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorLoginResponse {
    private String message;
    private boolean success;
    private String email;

}
