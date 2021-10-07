package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.repo.UserRepo;
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
    UserRepo userRepo;
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody ModelUserRegister modelUserRegister){
        System.out.println("hello");
        User user = new User();
        user.setPhoneNumber(modelUserRegister.getPhoneNumber());
        user.setName(modelUserRegister.getName());
        user.setPassword(modelUserRegister.getPassword());
        User u = userRepo.save(user);
        System.out.println("u: "+u.toString());
        return ResponseEntity.ok("ok");
    }
}
