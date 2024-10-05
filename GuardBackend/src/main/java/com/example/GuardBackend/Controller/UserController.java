package com.example.GuardBackend.Controller;

import com.example.GuardBackend.Entity.User;
import com.example.GuardBackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{chdr_id}")
    public ResponseEntity<User> getUserById(@PathVariable String chdr_id) {
        return userService.getUserById(chdr_id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{chdr_id}")
    public ResponseEntity<User> updateUser(@PathVariable String chdr_id, @RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUser(chdr_id, userDetails));
    }

    @DeleteMapping("/{chdr_id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String chdr_id) {
        userService.deleteUser(chdr_id);
        return ResponseEntity.noContent().build();
    }
}
