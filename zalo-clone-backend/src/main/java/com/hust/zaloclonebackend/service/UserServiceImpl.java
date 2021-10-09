package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.UUID;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService{
    UserRepo userRepo;
    @Override
    public User findById(UUID id) {
        return userRepo.findUserByUserId(id);
    }

    @Override
    public User findByPhoneNumber(String phoneNumber) {
        return userRepo.findUserByPhoneNumber(phoneNumber);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }
    @Override
    public User findByUsername(String name) {
        return userRepo.findUserByName(name);
    }
}
