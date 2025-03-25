package com.example.GuardBackend.Response;

import lombok.Data;
import lombok.Getter;

@Getter
@Data

public class ApiResponse {

    private String message;

    public ApiResponse(String message){

        this.message = message;
    }

}
