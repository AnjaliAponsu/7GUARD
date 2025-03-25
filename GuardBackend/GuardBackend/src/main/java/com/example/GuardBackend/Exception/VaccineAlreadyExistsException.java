package com.example.GuardBackend.Exception;

public class VaccineAlreadyExistsException extends RuntimeException {
    public VaccineAlreadyExistsException(String message) {
        super(message);
    }
}
