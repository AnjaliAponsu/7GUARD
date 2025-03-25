package com.example.GuardBackend.Service;

import com.example.GuardBackend.DTO.*;
import com.example.GuardBackend.Entity.*;
import com.example.GuardBackend.Repository.*;
import com.example.GuardBackend.ServiceImplementation.VaccineChannelingimp;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VaccineChannelingService implements VaccineChannelingimp {
    @Autowired
    private final ModelMapper modelMapper;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ImpOfVaccineRepository impOfVaccineRepository;

    @Autowired
    private VaccineStockRepository vaccineStockRepositary;

    @Autowired
    private ScanRepo scanRepo;

    @Autowired
    private ChildRepo childRepo;

    @Autowired
    private VaccineChannelingRepositary vaccineChannelingRepositary;

    @Autowired
    private VaccineStockService vaccineService;

    @Override
    public VaccineChanneling saveChanneling(@Valid VaccineChanneling vaccineChanneling){
        vaccineChannelingRepositary.save(modelMapper.map(vaccineChanneling, VaccineChannelingEntity.class));
        return vaccineChanneling;
    }

    @Override
    public VaccineChanneling updateVaccineChanneling(@Valid VaccineChanneling vaccineChanneling){
        vaccineChannelingRepositary.save(modelMapper.map(vaccineChanneling, VaccineChannelingEntity.class));
        return vaccineChanneling;
    }

    @Override//ok
    public List <VaccineChanneling> getAllVaccineChannelings(){
        List<VaccineChannelingEntity>vaccinechannelingList=vaccineChannelingRepositary.findAll();
        return modelMapper.map(vaccinechannelingList,new TypeToken<List<VaccineChanneling>>(){}.getType());

    }


    @Override//ok
    public VaccineChanneling getChannelingByChannelingID(@Valid Long cha_id){
        VaccineChannelingEntity channeling=vaccineChannelingRepositary.getChannelingByChannelingID(cha_id);
        return modelMapper.map(channeling,VaccineChanneling.class);
    }

    @Override//ok
    public List<VaccineChanneling> getChannelingByChannelingDate(@Valid String channeling_datetime){
        List<VaccineChannelingEntity> channelingList=vaccineChannelingRepositary.getChannelingByChannelingDate(channeling_datetime);
        return modelMapper.map(channelingList, new TypeToken<List<VaccineChanneling>>() {}.getType());
    }

    @Override//ok
    public List<VaccineChanneling> getChannelingByChannelingDoctor(@Valid String channeling_doctor){
        List<VaccineChannelingEntity>  channelingList=vaccineChannelingRepositary.getChannelingByChannelingDoctor(channeling_doctor);
        return modelMapper.map(channelingList, new TypeToken<List<VaccineChanneling>>() {}.getType());
    }

    @Override//ok
    public List<VaccineChanneling> getChannelingByChannelingDateDoctor(@Valid LocalDate channeling_datetime, @Valid String channeling_doctor) {
        List<VaccineChannelingEntity> channelingList = vaccineChannelingRepositary.getChannelingByChannelingDateDoctor(channeling_datetime, channeling_doctor);

        return modelMapper.map(channelingList, new TypeToken<List<VaccineChanneling>>() {}.getType());
    }

    @Override//ok
    public VaccineChanneling getLatestChannelingIdForUser(@Valid String nic) {
        Long latestChannelingId =vaccineChannelingRepositary.findLatestOrderIdByIndexNo(nic);
        if (latestChannelingId != null) {
            Optional<VaccineChannelingEntity> channelingOptional = vaccineChannelingRepositary.findById(latestChannelingId);
            if (channelingOptional.isPresent()) {
                return modelMapper.map(channelingOptional.get(), VaccineChanneling.class);
            }
        }
        return null;
    }

    @Override//ok
    public VaccineChanneling getLatestChannelingId(@Valid LocalDate channeling_doctor_date, @Valid String channeling_doctor){
        VaccineChannelingEntity channeling=vaccineChannelingRepositary.findLatestOrderId(channeling_doctor_date,channeling_doctor);
        if (channeling != null) {
            return modelMapper.map(channeling, VaccineChanneling.class);
        }
        return null;
    }

    @Override//ok
    @Transactional
    public ResponseDTO processChanneling(VaccineChanneling vaccineChanneling) {
        String vaccineName = vaccineChanneling.getChanneling_vaccine_name();
        Integer chdr = vaccineChanneling.getChanneling_chdr();
        Long longValue = Long.valueOf(chdr);
        List<ImpOfVaccine> vaccinelist = impOfVaccineRepository.findAll();
        List<Object[]> chdrcards = scanRepo.findScansByCHDR(longValue);
        String warning = "";
        String vaccineStatusMessage = " ";


        boolean previousVaccineChecked = false;
        String prevevacinename = null;

        if (chdrcards != null && !chdrcards.isEmpty()) {
            for (int i = 0; i < vaccinelist.size(); i++) {
                String currentVaccineName = vaccinelist.get(i).getImpofvaccine_name();
                if (vaccineName.equals(currentVaccineName) && i > 0) {
                    prevevacinename = vaccinelist.get(i - 1).getImpofvaccine_name();
                    break;
                }
            }

            if (prevevacinename != null) {
                for (Object[] record : chdrcards) {
                    String recordVaccineName = record[6] != null ? record[6].toString() : null; // vaccine_name
                    String scanResult = record[5] != null ? record[5].toString() : null; // scan

                    if (prevevacinename.equals(recordVaccineName)) {
                        if (scanResult == null) {
                            warning += "Previous vaccine: " + prevevacinename + " was not vaccinated (scan result is null).\n";
                        } else {
                            vaccineStatusMessage += "Previous vaccine: " + prevevacinename + " was successfully vaccinated.\n";
                        }
                        previousVaccineChecked = true;
                        break;
                    }
                }

                if (!previousVaccineChecked) {
                    warning += "Previous vaccine: " +"\n"+"\t"+ prevevacinename + " was not vaccinated yet.\n";
                }
            }
        } else {
            warning += "No previous vaccination records found.\n";
        }


        if ("Normal Channeling".equals(vaccineName) || "Outside Vaccine".equals(vaccineName)) {
            if (chdrcards == null || chdrcards.isEmpty()) {
                warning = "You have not been vaccinated before.";
            } else {
                Object[] lastRecord = chdrcards.get(chdrcards.size() - 1);
                String lastScanResult = lastRecord[5] != null ? lastRecord[5].toString() : null; // scan
                if (lastScanResult == null) {
                    warning = "Last scan is incomplete or missing.";
                }
            }
        }


        List<Appointment> doctors = appointmentRepository.findByName(vaccineChanneling.getChanneling_doctor());
        if (doctors.isEmpty()) {
            return new ResponseDTO("Doctor not found with name: " + vaccineChanneling.getChanneling_doctor(), false);
        }

        Appointment allocation = appointmentRepository.findByDoctorIdAndAllocationDate(
                vaccineChanneling.getDoctor_id(),
                vaccineChanneling.getChanneling_doctor_date()
        );
        if (allocation == null) {
            return new ResponseDTO(
                    "No allocation found for this date: " + vaccineChanneling.getDoctor_id() + " " + vaccineChanneling.getChanneling_doctor_date(),
                    false
            );
        }


        List<VaccineChannelingEntity> currentAppointments = vaccineChannelingRepositary
                .countByDoctor_idAndAppointmentDate(vaccineChanneling.getDoctor_id(), vaccineChanneling.getChanneling_doctor_date());
        Integer currentAppointmentCount = currentAppointments.size();
        if (currentAppointmentCount >= allocation.getAppointmentsPerDay()) {
            return new ResponseDTO("The doctor has reached the maximum number of patients for this date.", false);
        }


        int appointmentNumber = currentAppointmentCount + 1;
        vaccineChanneling.setChannel_number(appointmentNumber);


        if ("Normal Channeling".equals(vaccineName) || "Outside Vaccine".equals(vaccineName)) {
            VaccineChannelingEntity channeling = new VaccineChannelingEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(vaccineChanneling, channeling);
            vaccineChannelingRepositary.save(channeling);
            return new ResponseDTO("Channeling placed successfully. " + warning + "\n" + vaccineStatusMessage, true);
        }

        Optional<VaccineStock> vaccineOptional = vaccineStockRepositary.findByName(vaccineName);
        if (!vaccineOptional.isPresent()) {
            return new ResponseDTO("Vaccine not found.", false);
        }

        VaccineStock vaccine = vaccineOptional.get();
        if (vaccine.getVlistquantity() < vaccineChanneling.getRequested_qty()) {
            return new ResponseDTO("Vaccine is unavailable. Requested quantity exceeds stock.", false);
        }


        vaccine.setVlistquantity(vaccine.getVlistquantity() - vaccineChanneling.getRequested_qty());
        vaccineStockRepositary.save(vaccine);


        VaccineChannelingEntity appointmentEntity = new VaccineChannelingEntity();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(vaccineChanneling, appointmentEntity);
        vaccineChannelingRepositary.save(appointmentEntity);

        return new ResponseDTO(warning  + vaccineStatusMessage + "\n" + "Appointment successfully scheduled.", true);
    }

    @Override
    @Transactional//ok
    public boolean deleteChannelingByChannelingID( @Valid Long cha_id){

        String vaccinename= vaccineChannelingRepositary.getVaccineName(cha_id);
        System.out.println("name"+vaccinename);

        vaccineChannelingRepositary.deleteById(cha_id);
        if ("Normal Channeling".equals(vaccinename) || "Outside Vaccine".equals(vaccinename)){
            System.out.println("Vaccine Stock is Not involved");
        }else{
            Optional<Integer> vquantity=vaccineStockRepositary.getVaccineQuantity(vaccinename);
            int quantity=vquantity.orElse(0);
            quantity+=1;
            System.out.println("quantity"+quantity);
            vaccineStockRepositary.updateQuantity(vaccinename,quantity);


        }

        return true;
    }
    @Override
    @Transactional//ok
    public VaccineChanneling changeChannelingAdmin( @Valid Long cha_id, VaccineChanneling vaccineChanneling){

        String vaccinename= vaccineChannelingRepositary.getVaccineName(cha_id);
        System.out.println("name"+vaccinename);


        if ("Normal Channeling".equals(vaccinename) || "Outside Vaccine".equals(vaccinename)){
            System.out.println("Vaccine Stock is Not involved");
        }else{
            Optional<Integer> vquantity=vaccineStockRepositary.getVaccineQuantity(vaccinename);
            int quantity=vquantity.orElse(0);
            quantity+=1;
            System.out.println("quantity"+quantity);
            vaccineStockRepositary.updateQuantity(vaccinename,quantity);


        }

        VaccineChannelingEntity entity = modelMapper.map(vaccineChanneling, VaccineChannelingEntity.class);
        vaccineChannelingRepositary.save(entity);

        return vaccineChanneling;
    }

@Override//ok
@Transactional
public ResponseDTO updateChannelingByID(@Valid Long cha_id , VaccineChanneling vaccineChanneling){
        String vaccineName = vaccineChanneling.getChanneling_vaccine_name();
        String vaccinename=vaccineChannelingRepositary.getVaccineName(cha_id);
        LocalDate previouschanneldate= LocalDate.parse(vaccineChannelingRepositary.getChannelingDate(cha_id));
        int previouschannelnumber=vaccineChannelingRepositary.getChannelingNumber(cha_id);

    Integer chdr = vaccineChanneling.getChanneling_chdr();
    Long longValue = Long.valueOf(chdr);
    List<ImpOfVaccine> vaccinelist = impOfVaccineRepository.findAll();
    List<Object[]> chdrcards = scanRepo.findScansByCHDR(longValue);
    String warning = "";
    String vaccineStatusMessage = "";


    boolean previousVaccineChecked = false;
    String prevevacinename = null;

    if (chdrcards != null && !chdrcards.isEmpty()) {
        for (int i = 0; i < vaccinelist.size(); i++) {
            String currentVaccineName = vaccinelist.get(i).getImpofvaccine_name();
            if (vaccineName.equals(currentVaccineName) && i > 0) {
                prevevacinename = vaccinelist.get(i - 1).getImpofvaccine_name();
                break;
            }
        }

        if (prevevacinename != null) {
            for (Object[] record : chdrcards) {
                String recordVaccineName = record[6] != null ? record[6].toString() : null; // vaccine_name
                String scanResult = record[5] != null ? record[5].toString() : null; // scan

                if (prevevacinename.equals(recordVaccineName)) {
                    if (scanResult == null) {
                        warning += "Previous vaccine: "+"\n"+"\t"+ prevevacinename + " was not vaccinated (scan result is null).\n";
                    } else {
                        vaccineStatusMessage += "Previous vaccine: " + prevevacinename + " was successfully vaccinated.\n";
                    }
                    previousVaccineChecked = true;
                    break;
                }
            }

            if (!previousVaccineChecked) {
                warning += "Previous vaccine: " + prevevacinename + " 0was not vaccinated yet.\n";
            }
        }
    } else {
        warning += "No previous vaccination records found.\n";
    }


    if ("Normal Channeling".equals(vaccinename) || "Outside Vaccine".equals(vaccinename)) {
        if (chdrcards == null || chdrcards.isEmpty()) {
            warning = "You have not been vaccinated before.";
        } else {
            Object[] lastRecord = chdrcards.get(chdrcards.size() - 1);
            String lastScanResult = lastRecord[5] != null ? lastRecord[5].toString() : null; // scan
            if (lastScanResult == null) {
                warning = "Last scan is incomplete or missing.";
            }
        }
    }


    if(vaccineChanneling.getChanneling_vaccine_name()==vaccinename){
            System.out.println("Same");
        } else if("Normal Channeling".equals(vaccineChanneling.getChanneling_vaccine_name()) || "Outside Vaccine".equals(vaccineChanneling.getChanneling_vaccine_name())){
            System.out.println("No vaccine");
        } else{
            Optional<Integer> vquantity=vaccineStockRepositary.getVaccineQuantity(vaccinename);
            int quantity=vquantity.orElse(0);

            quantity+=1;
            System.out.println("quantity"+quantity);
            vaccineStockRepositary.updateQuantity(vaccinename,quantity);
        }

        if ("Normal Channeling".equals(vaccineName) || "Outside Vaccine".equals(vaccineName)) {

            VaccineChannelingEntity channeling = new VaccineChannelingEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(vaccineChanneling, channeling);
            vaccineChannelingRepositary.save(channeling);
            return new ResponseDTO("Channeling placed successfully.", true);
        }


        Optional<VaccineStock> vaccineOptional = vaccineStockRepositary.findByName(vaccineName);
        if (!vaccineOptional.isPresent()) {
            return new ResponseDTO("Vaccine not found.", false);
        }

        VaccineStock vaccine = vaccineOptional.get();
        if (vaccine.getVlistquantity() < vaccineChanneling.getRequested_qty()) {
            return new ResponseDTO("Vaccine is unavailable. Requested quantity exceeds stock.", false);
        }


        vaccine.setVlistquantity(vaccine.getVlistquantity() - vaccineChanneling.getRequested_qty());
        vaccineStockRepositary.save(vaccine);



        VaccineChannelingEntity appointmentEntity = new VaccineChannelingEntity();
        modelMapper.map(vaccineChanneling, appointmentEntity);
        vaccineChannelingRepositary.save(appointmentEntity);



        return new ResponseDTO(warning + vaccineStatusMessage + "\n" + "Appointment successfully scheduled.", true);
    }

  @Override
    public VaccineChanneling updateChanneling(@Valid Long cha_id ,@Valid VaccineChanneling vaccineChanneling){
        VaccineChannelingEntity channeling=vaccineChannelingRepositary.updateChanneling(cha_id);
        vaccineChannelingRepositary.save(modelMapper.map(vaccineChanneling, VaccineChannelingEntity.class));
        return vaccineChanneling;
    }


}


