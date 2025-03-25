package com.example.GuardBackend.Response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParentLoginResponse {
    private String message;
    private boolean success;
    private Integer loginCount;
}
