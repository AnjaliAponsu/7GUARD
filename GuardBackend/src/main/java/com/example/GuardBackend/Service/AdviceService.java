package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.Repository.AdviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdviceService {

    private final AdviceRepository adviceRepository;

    @Autowired
    public AdviceService(AdviceRepository adviceRepository) {
        this.adviceRepository = adviceRepository;
    }

    // Create new advice
    public Advice createAdvice(Advice advice) {
        return adviceRepository.save(advice);
    }

    // Get all advice
    public List<Advice> getAllAdvice() {
        return adviceRepository.findAll();
    }

    // Get advice by ID
    public Optional<Advice> getAdviceById(Long id) {
        return adviceRepository.findById(id);
    }

    // Update advice
    public Advice updateAdvice(Long id, Advice updatedAdvice) {
        Advice advice = adviceRepository.findById(id).orElseThrow();
        advice.setCategory(updatedAdvice.getCategory());
        advice.setMessage(updatedAdvice.getMessage());
        return adviceRepository.save(advice);
    }

    // Delete advice
    public void deleteAdvice(Long id) {
        adviceRepository.deleteById(id);
    }

    // Get advice by category (for notifications)
    public List<Advice> getAdviceByCategory(String category) {
        return adviceRepository.findByCategory(category);
    }
}
