package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;

import java.util.UUID;

public interface UserService {
    User findById(UUID id);

    User findByPhoneNumber(String phoneNumber);

    User save(User user);

    User findByUsername(String name);

}
