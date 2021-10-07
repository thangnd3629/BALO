package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;

import java.util.UUID;

public interface UserService {
    User findById(UUID id);
    User findByUsername(String name);
}
