package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRepo extends CrudRepository<User, UUID> {
    User findUserByUserId(UUID id);

    User findUserByPhoneNumber(String phoneNumber);
}
