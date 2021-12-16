package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepo extends CrudRepository<User, String> {
    User findUserByUserId(String id);
    User getUserByUserId(String id);
    User findUserByName(String username);
    User findUserByPhoneNumber(String phoneNumber);
    
}
