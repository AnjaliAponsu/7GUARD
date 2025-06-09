package com.example.GuardBackend.ServiceImplementation;

import com.example.GuardBackend.DTO.AdviceDTO;
import com.example.GuardBackend.Entity.Advice;

import java.util.List;

public interface AdviceService {

    // Save a new advice
    void saveAdvice(AdviceDTO adviceDTO);

    // Retrieve all advices
    List<Advice> getAllAdvice();

    // Delete advice by ID
    void deleteAdvice(Integer id);

    AdviceDTO updateAdviceById(Integer id, AdviceDTO adviceDTO);


    AdviceDTO getById(Integer id);

    AdviceDTO getByBmiStatus(String bmiStatus);
}
