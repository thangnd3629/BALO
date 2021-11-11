package com.hust.zaloclonebackend.controller;

import java.security.Principal;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.service.ZaloService;
import com.hust.zaloclonebackend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ZaloController {
    ZaloService zaloService;
    UserService userService;
    
    //Hasn't set status code, caught exception and validated ..
    @PostMapping("/post/add")
    public ResponseEntity<?> addPost(@RequestBody ModelAddPost modelAddPost, Principal principal) throws Exception {
        //get User from Session
        User user = userService.findByPhoneNumber(principal.getName());
        ModelAddPostResponse modelAddPostResponse = zaloService.addPost(modelAddPost, user);
        return ResponseEntity.status(HttpStatus.OK).body(modelAddPostResponse);


    }

    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") String id,Principal principal) throws Exception {
        ModelGetPostResponse modelGetPostResponse = zaloService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(modelGetPostResponse);

    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id,Principal principal) throws Exception {
        ModelDeletePostResponse modelDeletePostResponse = zaloService.deletePostById(id);
        return ResponseEntity.ok(modelDeletePostResponse);
    }

    @PostMapping("/post/get-user-list-post")
    public ResponseEntity<?> getUserListPost(Principal principal, @RequestBody ModelGetUserListPostRequest modelGetUserListPostRequest ){

        Pageable pageable = PageRequest.of((modelGetUserListPostRequest.getLastId()+1)/modelGetUserListPostRequest.getCount(), modelGetUserListPostRequest.getCount(), Sort.by("createdDate").descending());
        String phoneNumber = principal.getName();

        ModelGetListPostResponse modelGetListPostResponse = zaloService.getUserListPost(pageable, phoneNumber);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

    @PostMapping("/post/edit")
    public ResponseEntity<?> editPost(@RequestBody ModelEditPostRequest modelEditPostRequest ){
        ModelEditPostResponse modelEditPostResponse = zaloService.editPost(modelEditPostRequest);
        return ResponseEntity.status(200).body(modelEditPostResponse);
    }

    @PostMapping("/report-post")
    public ResponseEntity<?> reportPost(@RequestBody ModelReportPost modelReportPost, Principal principal){
        ZaloStatus zaloStatus = zaloService.reportPost(modelReportPost, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }

    @PostMapping("/comment/add")
    public ResponseEntity<?> addComment(@RequestBody ModelAddComment modelAddComment, Principal principal){
        ZaloStatus zaloStatus = zaloService.addComment(modelAddComment, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }

    @GetMapping("/get-comment-paging/{postId}")
    public ResponseEntity<?> getCommentPaging(Pageable pageable, @PathVariable("postId") String postId){
        ModelGetCommentPagingResponse modelGetCommentPagingResponse = zaloService.getCommentPaging(pageable, postId);
        return ResponseEntity.status(200).body(modelGetCommentPagingResponse);
    }


}
