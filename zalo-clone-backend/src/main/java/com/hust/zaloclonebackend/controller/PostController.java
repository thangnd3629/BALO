package com.hust.zaloclonebackend.controller;

import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.model.response.PostResponse;
import com.hust.zaloclonebackend.service.PostServiceImpl;
import com.hust.zaloclonebackend.service.UserServiceImpl;
import com.hust.zaloclonebackend.util.EpochConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {
    PostServiceImpl postService;
    UserServiceImpl userService;
    
    //Hasn't set status code, caught exception and validated ..
    @PostMapping("/post/add")
    public ResponseEntity<?> addPost(@RequestBody ModelAddPost modelAddPost, Principal principal) throws Exception {
        //get User from Session
        User user = userService.findByPhoneNumber(principal.getName());
        ModelAddPostResponse modelAddPostResponse = postService.addPost(modelAddPost, user);
        return ResponseEntity.status(HttpStatus.OK).body(modelAddPostResponse);


    }

    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") String id,Principal principal) throws Exception {
        ModelGetPostResponse modelGetPostResponse = postService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(modelGetPostResponse);

    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id,Principal principal) throws Exception {
        ModelDeletePostResponse modelDeletePostResponse = postService.deletePostById(id);
        return ResponseEntity.ok(modelDeletePostResponse);
    }
}
