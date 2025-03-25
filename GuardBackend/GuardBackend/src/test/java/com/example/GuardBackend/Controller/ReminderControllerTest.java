//package com.example.GuardBackend.Controller;
//
//import com.example.GuardBackend.Entity.Reminder;
//import com.example.GuardBackend.ServiceImplementation.ReminderService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.mockito.junit.MockitoJUnitRunner;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.Mockito.*;
//import static org.junit.Assert.*;
//
//@RunWith(MockitoJUnitRunner.class)
//public class ReminderControllerTest {
//
//    @InjectMocks
//    private ReminderController reminderController;
//
//    @Mock
//    private ReminderService reminderService;
//
//    @Before
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetAllDetails() {
//        Reminder reminder = new Reminder();
//        reminder.setChdr_id(1);
//        reminder.setVaccine_name("Polio");
//
//        when(reminderService.getAllDetails()).thenReturn(Arrays.asList(reminder));
//
//        List<Reminder> reminders = reminderController.getAllDetails();
//        assertEquals(1, reminders.size());
//        assertEquals("Polio", reminders.get(0).getVaccine_name());
//    }
//
//    @Test
//    public void testDeleteRoomDetails() {
//        when(reminderService.deleteDetails(1)).thenReturn("Reminder deleted successfully");
//
//        String response = reminderController.deleteRoomDetails(1);
//        assertEquals("Reminder deleted successfully", response);
//    }
//
//    @Test
//    public void testAllDetails() {
//        Reminder reminder = new Reminder();
//        reminder.setChdr_id(1);
//
//        when(reminderService.AllDetails()).thenReturn(Arrays.asList(reminder));
//
//        List<Reminder> reminders = reminderController.AllDetails();
//        assertEquals(1, reminders.size());
//    }
//}
