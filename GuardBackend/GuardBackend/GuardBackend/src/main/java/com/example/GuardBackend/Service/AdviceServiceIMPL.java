package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.AdviceDTO;
import com.example.GuardBackend.Entity.Advice;
import com.example.GuardBackend.Repository.AdviceRepository;
import com.example.GuardBackend.Repository.BmiRepo;
import com.example.GuardBackend.ServiceImplementation.AdviceService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdviceServiceIMPL implements AdviceService {
    @Autowired
    private AdviceRepository adviceRepository;

    @Autowired
    private BmiRepo bmiRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void saveAdvice(AdviceDTO adviceDTO) {
        Advice advice = modelMapper.map(adviceDTO,Advice.class);
        Advice savedAdvice=adviceRepository.save(advice);
    }

    @Override
    public List<Advice> getAllAdvice() {
        return adviceRepository.findAll();
    }


    @Override
    public void deleteAdvice(Integer id) {
        adviceRepository.deleteById(id);
    }

    public AdviceDTO updateAdviceById(@Valid Integer id , @Valid AdviceDTO adviceDTO){
        Optional <Advice> adviceOptional=adviceRepository.findById(id);
        adviceRepository.save(modelMapper.map(adviceDTO, Advice.class));
        return adviceDTO;
    }

    public AdviceDTO getById(@Valid Integer id){
        Optional<Advice>advice = adviceRepository.findById(id);
        return modelMapper.map(advice,AdviceDTO.class);
    }

    public AdviceDTO getByBmiStatus(@Valid String bmiStatus) {

        Optional<Advice> advice = adviceRepository.findMessageByBmiStatus(bmiStatus);

        return modelMapper.map(advice,AdviceDTO.class);
    }


}