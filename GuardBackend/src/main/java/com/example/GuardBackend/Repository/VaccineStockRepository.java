package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.VaccineStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineStockRepository extends JpaRepository<VaccineStock, Long> {

}
