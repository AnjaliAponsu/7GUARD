package com.example.GuardBackend.Service;

public class VaccineAlreadyExistsException extends RuntimeException {
    public VaccineAlreadyExistsException(String message) {
        super(message);
    }
}
