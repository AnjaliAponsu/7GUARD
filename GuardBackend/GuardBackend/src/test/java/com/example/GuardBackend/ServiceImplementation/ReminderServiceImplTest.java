//package com.example.GuardBackend.ServiceImplementation;
//
//import com.example.GuardBackend.Entity.Reminder;
//import com.example.GuardBackend.Repository.ReminderRepository;
//import com.example.GuardBackend.Service.ReminderServiceImpl;
//import org.junit.Before;
//import org.junit.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.mockito.Mockito.*;
//import static org.junit.Assert.*;
//
//public class ReminderServiceImplTest {
//
//    @InjectMocks
//    private ReminderServiceImpl reminderService;
//
//    @Mock
//    private ReminderRepository reminderRepository;
//
//    @Before
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testDeleteDetails() {
//        when(reminderRepository.existsById(1)).thenReturn(true);
//
//        String response = reminderService.deleteDetails(1);
//        assertEquals("Reminder with ID 1 has been deleted successfully.", response);
//
//        verify(reminderRepository, times(1)).deleteById(1);
//    }
//
//    @Test
//    public void testGetAllDetails() {
//        Reminder reminder = new Reminder();
//        reminder.setWeeks("10");
//        reminder.setScan_result(null);
//
//        when(reminderRepository.findAll()).thenReturn(Arrays.asList(reminder));
//
//        List<Reminder> reminders = reminderService.getAllDetails();
//        assertEquals(1, reminders.size());
//    }
//
//    @Test
//    public void testAllDetails() {
//        Reminder reminder = new Reminder();
//        reminder.setChdr_id(1);
//
//        when(reminderRepository.findAll()).thenReturn(Arrays.asList(reminder));
//
//        List<Reminder> reminders = reminderService.AllDetails();
//        assertEquals(1, reminders.size());
//    }
//}
