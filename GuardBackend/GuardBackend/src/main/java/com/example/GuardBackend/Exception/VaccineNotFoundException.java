package com.example.GuardBackend.Exception;

public class VaccineNotFoundException extends RuntimeException {
    public VaccineNotFoundException(String message) {
        super(message);
    }
}
