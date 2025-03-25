package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.BmiDTO;
import com.example.GuardBackend.Entity.Bmi;
import com.example.GuardBackend.Entity.CHDR;
import com.example.GuardBackend.Repository.BmiRepo;
import com.example.GuardBackend.Repository.ChdrRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BmiService {

    @Autowired
    private BmiRepo bmiRepo;

    @Autowired
    private ChdrRepo chdrRepo;


    @Transactional
    public Bmi createBmi(BmiDTO bmiDTO) {
        Optional<CHDR> chdrOpt = chdrRepo.findByChdrId(bmiDTO.getChdrId());
        if (chdrOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid chdrId: " + bmiDTO.getChdrId());
        }

        CHDR chdr = chdrOpt.get();

        Bmi bmi = new Bmi();
        bmi.setChdr(chdr);
        bmi.setChildWeight(bmiDTO.getChildWeight());
        bmi.setChildHeight(bmiDTO.getChildHeight());
        bmi.calculateBmi();

        return bmiRepo.save(bmi);
    }


    public Optional<Bmi> getBmiById(Integer id) {
        return bmiRepo.findById(id);
    }

    public List<BmiDTO> getBmiByChdrId(Integer chdrId) {
        return bmiRepo.findBmiByChdrId(chdrId);
    }
}
