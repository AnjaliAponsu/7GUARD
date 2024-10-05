package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
