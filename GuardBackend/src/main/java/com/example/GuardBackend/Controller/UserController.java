package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.User;
import com.example.GuardBackend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{chdr_id}")
    public ResponseEntity<User> getUserById(@PathVariable String chdr_id) {
        return userService.getUserById(chdr_id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{chdr_id}")
    public ResponseEntity<User> updateUser(@PathVariable String chdr_id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(chdr_id, userDetails);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chdr_id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String chdr_id) {
        userService.deleteUser(chdr_id);
        return ResponseEntity.noContent().build();
    }
}
