package com.hust.zaloclonebackend.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;


@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

//    @Column(name = "name")
//    @NotNull
    private String name;

//    @Column(name = "password")
//    @NotNull
    private String password;

//    @Column(name = "phone_number", unique = true)
//    @NotNull
    private String phoneNumber;




}
