package com.example.GuardBackend.Service;

import com.example.GuardBackend.Entity.User;
import com.example.GuardBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String chdr_id) {
        return userRepository.findById(chdr_id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String chdr_id, User userDetails) {
        User user = userRepository.findById(chdr_id).orElseThrow();
        user.setHeight(userDetails.getHeight());
        user.setWeight(userDetails.getWeight());
        user.setDate(userDetails.getDate());
        user.setBmi(userDetails.getBmi());
        user.setAge(userDetails.getAge());
        return userRepository.save(user);
    }

    public void deleteUser(String chdr_id) {
        userRepository.deleteById(chdr_id);
    }
}
