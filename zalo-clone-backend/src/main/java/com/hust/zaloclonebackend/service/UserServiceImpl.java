package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.UserRepo;

import java.util.UUID;

public class UserServiceImpl implements UserService{
    UserRepo userRepo;
    @Override
    public User findById(UUID id) {
        return userRepo.findUserByUserId(id);
    }
}
