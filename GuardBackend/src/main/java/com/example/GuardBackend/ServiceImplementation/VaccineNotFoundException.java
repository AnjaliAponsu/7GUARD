package com.example.GuardBackend.ServiceImplementation;

public class VaccineNotFoundException extends RuntimeException {
    public VaccineNotFoundException(String message) {
        super(message);
    }
}
