package com.hust.zaloclonebackend.controller;

import java.security.Principal;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.service.PostServiceImpl;
import com.hust.zaloclonebackend.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @PostMapping("/post/get-user-list-post")
    public ResponseEntity<?> getUserListPost(Principal principal, @RequestBody ModelGetUserListPostRequest modelGetUserListPostRequest ){

        Pageable pageable = PageRequest.of((modelGetUserListPostRequest.getLastId()+1)/modelGetUserListPostRequest.getCount(), modelGetUserListPostRequest.getCount(), Sort.by("createdDate").descending());
        String phoneNumber = principal.getName();

        ModelGetListPostResponse modelGetListPostResponse = postService.getUserListPost(pageable, phoneNumber);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

    @PostMapping("/post/edit")
    public ResponseEntity<?> editPost(@RequestBody ModelEditPostRequest modelEditPostRequest ){
        ModelEditPostResponse modelEditPostResponse = postService.editPost(modelEditPostRequest);
        return ResponseEntity.status(200).body(modelEditPostResponse);
    }
}
