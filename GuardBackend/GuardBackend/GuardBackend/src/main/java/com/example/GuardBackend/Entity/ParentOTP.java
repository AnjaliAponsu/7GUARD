package com.example.GuardBackend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Entity
@Table(name = "user_login_details")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParentOTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer otpId;

    @ManyToOne
    @JoinColumn(name = "parent_nic", referencedColumnName = "parent_nic")
    private Parent parent;

    @NotNull
    @Column(name = "parent_password")
    private  String otp;

    @NotNull
    @Column(name ="login_count", nullable=true)
    private Integer loginCount;

}
