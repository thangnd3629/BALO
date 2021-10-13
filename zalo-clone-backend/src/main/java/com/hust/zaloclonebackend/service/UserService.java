package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;

public interface UserService {
    User findById(String id);

    User findByPhoneNumber(String phoneNumber);

    User save(User user);

    User findByUsername(String name);

}
