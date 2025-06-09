package com.example.GuardBackend.Service;
import com.example.GuardBackend.DTO.ChildDTO;
import com.example.GuardBackend.Entity.*;
import com.example.GuardBackend.Repository.ChdrRepo;
import com.example.GuardBackend.Repository.ChildRepo;
import com.example.GuardBackend.Repository.DoctorRepo;
import com.example.GuardBackend.Repository.ParentRepo;
import com.example.GuardBackend.Response.ApiResponse;
import com.example.GuardBackend.ServiceImplementation.ChildService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChildServiceIMPL implements ChildService {

    @Autowired
    private ParentRepo parentRepo;

    @Autowired
    private ChildRepo childRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private ChdrRepo chdrRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void addChild(ChildDTO childDTO) {
        String parentNic = childDTO.getParentNic();
        String docFullName = childDTO.getAssignDoctor(); //Change anjali code

        Optional<Parent> parentOptional = parentRepo.findByParentNic(parentNic);
        Optional<Doctor> doctorOptional = doctorRepo.findByDocFullName(docFullName);


        if (parentOptional.isPresent()){
            if(doctorOptional.isPresent()) {
                Parent parent = parentOptional.get();
                Doctor doctor = doctorOptional.get();

                Child child = modelMapper.map(childDTO, Child.class);
                child.setParent(parent);
                child.setDoctor(doctor);
                child.setAssignDoctor(doctor.getDocFullName());
                childRepo.save(child);

                String firstName = child.getC_fName();
                String lastName = child.getC_lName();
                LocalDate dob = child.getC_dob();
                String gender = child.getC_gender();
                String bloodGroup = child.getC_bloodGroup();
                String allergies = child.getC_allergies();
                String medicalCondition = child.getC_medicalCondition();
                String assign_doctor = child.getAssignDoctor();
                String parentnic =parent.getParentNic();
                String email =parent.getP_email();

                Integer chdrId = generateChdrId();

                CHDR chdr = new CHDR();
                chdr.setChdrId(chdrId);
                chdr.setChild(child);
                chdr.setFirstName(firstName);
                chdr.setLastName(lastName);
                chdr.setDob(dob);
                chdr.setGender(gender);
                chdr.setBloodGroup(bloodGroup);
                chdr.setAllergies(allergies);
                chdr.setMedicalCondition(medicalCondition);
                chdr.setAssignDoctor(assign_doctor);
                chdr.setParentNic(parentnic);
                chdr.setEmail(email);

                chdrRepo.save(chdr);

            }

            else {
                throw new RuntimeException("Doctor not found");
            }

        }

        else {
            throw new RuntimeException("Parent not found. Please check Parent NIC.");
        }

    }

    private Integer generateChdrId() {
        Random object = new Random();
        Integer chdrId;
        do {
            chdrId = 100000 + object.nextInt(900000);
        }while (chdrRepo.existsById(chdrId));
        return chdrId;
    }

    @Override
    public List<String> getDoctorNames() {
        return doctorRepo.findAll()
                .stream()
                .map(Doctor::getDocFullName)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isParentNICExists(String parentNic){
        return parentRepo.findAll()
                .stream()
                .map(Parent::getParentNic)
                .anyMatch(nic -> nic.equals(parentNic));
    }

    public ApiResponse updateChild (Integer child_id, Child updateChild){
        Optional<Child>childOptional = childRepo.findById(child_id);

        if(childOptional.isPresent()){
            Child existingChild = childOptional.get();
            existingChild.setC_fName(updateChild.getC_fName());
            existingChild.setC_lName(updateChild.getC_lName());
            existingChild.setC_dob(updateChild.getC_dob());
            existingChild.setC_gender(updateChild.getC_gender());
            existingChild.setC_bloodGroup(updateChild.getC_bloodGroup());
            existingChild.setC_allergies(updateChild.getC_allergies());
            existingChild.setC_medicalCondition(updateChild.getC_medicalCondition());
            existingChild.setRelationshipToGuardian(updateChild.getRelationshipToGuardian());
            existingChild.setAssignDoctor(updateChild.getAssignDoctor());

            Child saveChild = childRepo.save(existingChild);
            return new ApiResponse ("Updated successfully");

        }

        else{
            return new ApiResponse("Child Not found");
        }

    }

    @Override
    public List<Map<String, Object>> findChildByParentNic(String parentNic) {
        List<Child> children = childRepo.findByParent_ParentNic(parentNic);
        if (children != null) {
            return children.stream()//change anjali code
                    .map(child -> {
                        Map<String, Object> childData = new HashMap<>();
                        childData.put("childId", child.getChild_id());
                        childData.put("fullName", child.getC_fName() + " " + child.getC_lName());
                        return childData;
                    })
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }


    @Override
    public ChildDTO getChildById(Integer child_id){
        Optional<Child> child = childRepo.findById(child_id);
        return modelMapper.map(child, ChildDTO.class);
    }

    @Override
    public List<Child> getChildren(){
        List<Child>childList = childRepo.findAll();
        return modelMapper.map(childList,new TypeToken<List<ChildDTO>>(){}.getType());
    }
    @Override  //Amada
    public List<ChildDTO> getAllChildren(){
        List<Child>childList=childRepo.findAll();
        return modelMapper.map(childList,new TypeToken<List<ChildDTO>>(){}.getType());
    }

    @Override
    public List<ChildDTO>  getChildByParentNic(@Valid String parentNic){
        List<Child>  childrenList=childRepo.getChildByParentNic(parentNic);
        return modelMapper.map(childrenList, new TypeToken<List<ChildDTO>>() {}.getType());
    }
}
