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

    /**
     * Fetch all users.
     * @return List of users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Fetch a user by ID.
     * @param chdr_id User ID.
     * @return Optional of User.
     */
    public Optional<User> getUserById(String chdr_id) {
        return userRepository.findById(chdr_id);
    }

    /**
     * Create a new user.
     * @param user User object to save.
     * @return Created user.
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Update an existing user.
     * @param chdr_id User ID.
     * @param userDetails Updated user details.
     * @return Updated user.
     */
    public User updateUser(String chdr_id, User userDetails) {
        User user = userRepository.findById(chdr_id).orElseThrow(() ->
                new IllegalArgumentException("User with ID " + chdr_id + " not found.")
        );

        user.setHeight(userDetails.getHeight());
        user.setWeight(userDetails.getWeight());
        user.setDob(userDetails.getDob()); // Updated to use LocalDate for date of birth
        return userRepository.save(user); // BMI and Age are now dynamically calculated
    }

    /**
     * Delete a user by ID.
     * @param chdr_id User ID to delete.
     */
    public void deleteUser(String chdr_id) {
        if (!userRepository.existsById(chdr_id)) {
            throw new IllegalArgumentException("User with ID " + chdr_id + " does not exist.");
        }
        userRepository.deleteById(chdr_id);
    }
}
