package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.ChdrDTO;
import com.example.GuardBackend.Entity.CHDR;
import com.example.GuardBackend.Repository.ChdrRepo;
import com.example.GuardBackend.ServiceImplementation.ChdrService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChdrServiceIMPL implements ChdrService {
    @Autowired
    private final ChdrRepo chdrRepo ;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ChdrDTO getChildByChildCHDR(@Valid Integer child_id){
        CHDR chdr=chdrRepo.getChildByChildCHDR(child_id);
        return modelMapper.map(chdr, ChdrDTO.class);
    }
    public ChdrDTO getChildIdByChildCHDR(Integer chdr_id) {
        CHDR chdrcard = chdrRepo.getChildIdByChildCHDR(chdr_id);
        return modelMapper.map(chdrcard, ChdrDTO.class);
    }

    //Dewindi
    @Override
    public ChdrDTO getChildByChildId(Integer child_id){
        Optional<CHDR> chdrOptional = chdrRepo.findByChild_Child_Id(child_id);
        return modelMapper.map(chdrOptional, ChdrDTO.class);
    }


}
