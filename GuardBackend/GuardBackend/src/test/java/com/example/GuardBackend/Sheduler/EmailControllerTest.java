package com.example.GuardBackend.Sheduler;

import com.example.GuardBackend.Entity.Reminder;
import com.example.GuardBackend.Repository.ReminderRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

public class EmailControllerTest {

    @InjectMocks
    private EmailController emailController;

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private ReminderRepository reminderRepository;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendEmailSuccess() {
        Reminder reminder = new Reminder();
        reminder.setChdr_id(1);
        reminder.setEmail("test@example.com");
        reminder.setVaccine_name("Polio");
        reminder.setVaccine_date(LocalDate.now());

        when(reminderRepository.findById(1)).thenReturn(Optional.of(reminder));

        String response = emailController.sendEmail(1);
        assertEquals("Email sent successfully to: test@example.com", response);

        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));
        verify(reminderRepository, times(1)).save(reminder);
    }

    @Test
    public void testSendEmailNoEmailFound() {
        Reminder reminder = new Reminder();
        reminder.setChdr_id(1);

        when(reminderRepository.findById(1)).thenReturn(Optional.of(reminder));

        String response = emailController.sendEmail(1);
        assertEquals("Email address not found for CHDR ID: 1", response);
    }

    @Test
    public void testSendEmailNotFound() {
        when(reminderRepository.findById(1)).thenReturn(Optional.empty());

        String response = emailController.sendEmail(1);
        assertEquals("No user found with CHDR ID: 1", response);
    }
}
