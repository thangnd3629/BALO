package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.repo.UserRepo;
import com.hust.zaloclonebackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class RegisterController {
    UserService userService;
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody ModelUserRegister modelUserRegister){
        if(userService.findByPhoneNumber(modelUserRegister.getPhoneNumber()) != null){
            ResponseEntity.status(200).body("phone number already exist");
        }
        User user = new User();
        user.setPhoneNumber(modelUserRegister.getPhoneNumber());
        user.setName(modelUserRegister.getName());
        user.setPassword(user.PASSWORD_ENCODER.encode(modelUserRegister.getPassword()));
        User u = userService.save(user);
        return ResponseEntity.status(200).body("Register Successful");
    }
}
