package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.ImpOfVaccine;
import com.example.GuardBackend.Entity.Reminder;
import com.example.GuardBackend.Entity.VaccineScanView;
import com.example.GuardBackend.Repository.ImpOfVaccineRepository;
import com.example.GuardBackend.Repository.ReminderRepository;
import com.example.GuardBackend.ServiceImplementation.ImpofVaccineScanImpl;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.example.GuardBackend.Repository.ImpOfVaccineScanViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

@Service
public class ImpOfVaccineScanViewService implements ImpofVaccineScanImpl {
    @Autowired
    private  ModelMapper modelMapper;
    private static final String API_URL = "http://localhost:8080/reminder/getAllVaccineScans";
    @Autowired
    private ImpOfVaccineScanViewRepository repository;

    @Autowired
    private ReminderRepository reminderRepository;
    @Autowired
    private ImpOfVaccineRepository impOfVaccineRepository;

    @Override
    public List<VaccineScanView> getAllVaccineScans() {
        return repository.getAllVaccineScans();
    }

    @Override
    @Transactional
    public void fetchAndSaveData() {
        RestTemplate restTemplate = new RestTemplate();
        List<ImpOfVaccine> vaccineList = impOfVaccineRepository.findAll();

        try {

            VaccineScanView[] fetchedScans = restTemplate.getForObject(API_URL, VaccineScanView[].class);

            if (fetchedScans != null && fetchedScans.length > 0) {
                List<Reminder> reminders = new ArrayList<>();

                for (VaccineScanView scan : fetchedScans) {

                    if (reminderRepository.existsByVaccineScanId(scan.getId())) {
                        continue;
                    }

                    Reminder reminder = new Reminder();
                    reminder.setVaccineScanId(scan.getId());
                    reminder.setScanDetails(scan.getVaccineName());
                    reminder.setChdr(scan.getChaID());
                    reminder.setVaccinatedDate(scan.getScanDate());
                    reminder.setEmail(scan.getEmail());
                    reminder.setStatus("Pending");


                    int currentIndex = findVaccineIndex(vaccineList, scan.getVaccineName());
                    if (currentIndex != -1 && currentIndex + 1 < vaccineList.size()) {
                        ImpOfVaccine nextVaccine = vaccineList.get(currentIndex + 1);


                        Date scanDate = scan.getScanDate();
                        LocalDate localScanDate = scanDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        LocalDate nextReminderDate = localScanDate.plusWeeks(Long.parseLong(nextVaccine.getImpofWeekRange()));
                        reminder.setNext(nextVaccine.getImpofvaccine_name());
                        reminder.setReminderDate(nextReminderDate);
                    } else {

                        reminder.setReminderDate(LocalDate.now().plusWeeks(2));
                    }

                    reminders.add(reminder);
                }


                reminderRepository.saveAll(reminders);
                System.out.println("Inserted " + reminders.size() + " new reminders.");
            } else {
                System.out.println("No data fetched from the API.");
            }
        } catch (Exception e) {
            System.err.println("Error fetching or saving data: " + e.getMessage());
        }
    }
    private int findVaccineIndex(List<ImpOfVaccine> vaccineList, String vaccineName) {
        for (int i = 0; i < vaccineList.size(); i++) {
            if (vaccineList.get(i).getImpofvaccine_name().equalsIgnoreCase(vaccineName)) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public String deleteDetails(Long chdrID) {
        if (repository.existsById(chdrID)) {
            repository.deleteById(chdrID);
            return "Reminder with ID " + chdrID + " has been deleted successfully.";
        } else {
            return "Reminder with ID " + chdrID + " does not exist. ERROR";
        }
    }


    @Override
    public List<Reminder> getAllDetails() {
        List<Reminder> reminderList=reminderRepository.findAlldetails();
        return modelMapper.map(reminderList,new TypeToken<List<Reminder>>(){}.getType());
    }
    @Override
    public VaccineScanView saveDetails(VaccineScanView vaccineScanView) {
        return repository.save(vaccineScanView);
    }

    @Override
    public List<VaccineScanView> AllDetails() {
        return repository.findAll();
    }



}