package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.model.ModelUserRegisterResponse;
import com.hust.zaloclonebackend.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService{
    UserRepo userRepo;
    @Override
    public User findById(String id) {
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

    @Override
    public ModelUserRegisterResponse register(ModelUserRegister modelUserRegister) throws Exception {
        User exist = userRepo.findUserByPhoneNumber(modelUserRegister.getPhoneNumber());
        if(Optional.ofNullable(exist).isPresent()){
            return ModelUserRegisterResponse.builder()
                    .zaloStatus(ZaloStatus.USER_EXISTED)
                    .user(null)
                    .build();
        }

        if(!validateModelUserRegister(modelUserRegister)){
            return ModelUserRegisterResponse.builder()
                    .zaloStatus(ZaloStatus.PARAMETER_VALUE_IS_INVALID)
                    .user(null)
                    .build();
        }

        User user = User.builder()
                .phoneNumber(modelUserRegister.getPhoneNumber())
                .password(modelUserRegister.getPassword())
                .name(modelUserRegister.getName())
                .build();
        User u;
        try {
            u = userRepo.save(user);
            return ModelUserRegisterResponse.builder()
                    .user(user)
                    .zaloStatus(ZaloStatus.OK)
                    .build();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
    private boolean validateModelUserRegister(ModelUserRegister modelUserRegister){
        return true;
    }


}
