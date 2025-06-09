package com.example.GuardBackend.Repository;

import com.example.GuardBackend.Entity.VaccineStock;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface VaccineStockRepository extends JpaRepository<VaccineStock, Long> {
    @Query(value="SELECT * FROM vaccine_stock WHERE vlistvaccine_name=?1 ",nativeQuery = true) //Amada
    Optional<VaccineStock> findByName(String name);

    @Query(value="SELECT vlistquantity FROM vaccine_stock WHERE vlistvaccine_name=?1 ",nativeQuery = true) // Amada
    Optional<Integer> getVaccineQuantity(String name);


    @Modifying //Amada
    @Transactional
    @Query(value="UPDATE vaccine_stock SET vlistquantity =?2 WHERE vlistvaccine_name =?1", nativeQuery = true)
    void updateQuantity(String name,int quantity);
}
