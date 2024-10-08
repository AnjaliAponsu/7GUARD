package com.example.GuardBackend.ServiceImplementation;

public class VaccineAlreadyExistsException extends RuntimeException {
    public VaccineAlreadyExistsException(String message) {
        super(message);
    }
}
