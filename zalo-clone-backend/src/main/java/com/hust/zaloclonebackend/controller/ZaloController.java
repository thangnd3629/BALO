package com.hust.zaloclonebackend.controller;

import java.security.Principal;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.model.response.ModelGetListConservation;
import com.hust.zaloclonebackend.service.ZaloService;
import com.hust.zaloclonebackend.service.UserService;

import io.swagger.models.Model;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ZaloController {
    ZaloService zaloService;
    UserService userService;

    //
    @PostMapping("/post/add")
    public ResponseEntity<?> addPost(@RequestBody ModelAddPost modelAddPost, Principal principal) throws Exception {
        //get User from Session
        log.info("add post {}", modelAddPost);
        User user = userService.findByPhoneNumber(principal.getName());
        ModelAddPostResponse modelAddPostResponse = zaloService.addPost(modelAddPost, user);
        return ResponseEntity.status(HttpStatus.OK).body(modelAddPostResponse);
    }
//
    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") String id,Principal principal) throws Exception {
        log.info("get post id {}", id);
        ModelGetPostResponse modelGetPostResponse = zaloService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(modelGetPostResponse);

    }
//
    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id,Principal principal) throws Exception {
        log.info("delete post id {}", id);
        ModelDeletePostResponse modelDeletePostResponse = zaloService.deletePostById(id);
        return ResponseEntity.ok(modelDeletePostResponse);
    }
//
    @PostMapping("/post/get-user-list-post")
    public ResponseEntity<?> getUserListPost(Principal principal, @RequestBody ModelGetUserListPostRequest modelGetUserListPostRequest ){
        log.info("get user list post {}", modelGetUserListPostRequest);
        Pageable pageable = PageRequest.of((modelGetUserListPostRequest.getLastId()+1)/modelGetUserListPostRequest.getCount(), modelGetUserListPostRequest.getCount(), Sort.by("createdDate").descending());
        String phoneNumber = principal.getName();

        ModelGetListPostResponse modelGetListPostResponse = zaloService.getUserListPost(pageable, phoneNumber);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }
//
    @PostMapping("/post/edit")
    public ResponseEntity<?> editPost(@RequestBody ModelEditPostRequest modelEditPostRequest ){
        log.info("edit post {}", modelEditPostRequest);
        ModelStatusResponse modelStatusResponse = zaloService.editPost(modelEditPostRequest);
        return ResponseEntity.status(200).body(modelStatusResponse);
    }
//
    @PostMapping("/report-post")
    public ResponseEntity<?> reportPost(@RequestBody ModelReportPost modelReportPost, Principal principal){
        log.info("report post {}", modelReportPost);
        ModelStatusResponse zaloStatus = zaloService.reportPost(modelReportPost, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }
//
    @PostMapping("/comment/add")
    public ResponseEntity<?> addComment(@RequestBody ModelAddComment modelAddComment, Principal principal){
        log.info("add comment {}", modelAddComment);
        ModelStatusResponse zaloStatus = zaloService.addComment(modelAddComment, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }
//
    @GetMapping("/get-comment-paging/{postId}")
    public ResponseEntity<?> getCommentPaging(Pageable pageable, @PathVariable("postId") String postId){
        log.info("get comment paging");
        ModelGetCommentPagingResponse modelGetCommentPagingResponse = zaloService.getCommentPaging(pageable, postId);
        log.info("modelGetCommentPagingResponse {}", modelGetCommentPagingResponse);
        return ResponseEntity.status(200).body(modelGetCommentPagingResponse);
    }
//
    @PostMapping("/comment/edit")
    public ResponseEntity<?> editComment(@RequestBody ModelEditComment modelEditComment){
        log.info("edit comment {}", modelEditComment);
        ModelStatusResponse zaloStatus = zaloService.editComment(modelEditComment);
        return ResponseEntity.status(200).body(zaloStatus);
    }

    @PostMapping("/post/like/{postId}")
    public ResponseEntity<?> likePost(Principal principal, @PathVariable("postId") String postId){
        log.info("like post {}", postId);
        ModelLikePostResponse modelLikePostResponse = zaloService.likePost(principal.getName(), postId);
        return ResponseEntity.status(200).body(modelLikePostResponse);
    }

    @PostMapping("/post/get-list-post-paging}")
    public ResponseEntity<?> getListPostPaging(Pageable pageable, Principal principal){
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdDate").and(Sort.by("modifiedDate")).descending());
        ModelGetListPostResponse modelGetListPostResponse = zaloService.getListPostPaging(principal.getName(), pageable);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

    @GetMapping("/friend-request-list")
    public ResponseEntity<?> getFriendRequestList(Pageable pageable, Principal principal){
        ModelGetListFriendRequest modelGetListFriendRequest = zaloService.getListFriendRequest(principal.getName(), pageable);
        return ResponseEntity.status(200).body(modelGetListFriendRequest);
    }

    @PostMapping("/handle-friend-request")
    public ResponseEntity<?> handleFriendRequest(Principal principal, @RequestBody ModelHandleFriendRequest req){
        ModelStatusResponse status = zaloService.handleFriendRequest(principal.getName(), req);
        return ResponseEntity.status(200).body(status);
    }

    @PostMapping("/send-frined-request/{userId}")
    public ResponseEntity<?> sendFriendRequest(Principal principal, @PathVariable("userId") String userId){
        ModelSendFriendRequestResponse resp = zaloService.sendFriendRequest(principal.getName(), userId);
        return ResponseEntity.status(200).body(resp);
    }

    @GetMapping("/get-list-conservation")
    public ResponseEntity<?> getListConservation(Principal principal, Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
        ModelGetListConservation listConservation = zaloService.getListConservationByUser(pageable,principal.getName());
        return ResponseEntity.status(200).body(listConservation);
    }

    @PostMapping("/get-message-paging")
    public ResponseEntity<?> getMessagePaging(Principal principal, @RequestBody ModelGetMessageRequest request, Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
        ModelGetListMessage response = zaloService.getListMessagePaging(pageable, request, principal.getName());
        return ResponseEntity.status(200).body(response);
    }



}
