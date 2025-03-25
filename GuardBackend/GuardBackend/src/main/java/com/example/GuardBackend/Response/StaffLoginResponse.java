package com.example.GuardBackend.Response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class StaffLoginResponse {
    private String message;
    private String type;
    private String email;
}
