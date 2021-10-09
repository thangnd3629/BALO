package com.hust.zaloclonebackend.controller;

import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.GetPostResponse;
import com.hust.zaloclonebackend.model.ModelPost;
import com.hust.zaloclonebackend.model.response.PostResponse;
import com.hust.zaloclonebackend.service.PostServiceImpl;
import com.hust.zaloclonebackend.service.UserServiceImpl;
import com.hust.zaloclonebackend.util.EpochConverter;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> addPost(@RequestBody ModelPost modelPost, Principal principal) throws ParseException {
        //get User from Session
        Post post = new Post();
        String username = principal.getName();
        User user = userService.findByPhoneNumber(username);
        post.setContent(modelPost.getDescribe());
        post.setPoster(user);
        post.setCreatedDate(EpochConverter.getCurrentEpoch());
        post.setModifiedDate(EpochConverter.getCurrentEpoch());
        postService.save(post);
        
        HashMap<String, String> response = new HashMap<>();
        String baseUrl = "unkown"; // ? How to get URL :)
        String postId = post.getPostId().toString();
        String url = baseUrl + "/" + username + "/posts" + postId;
        response.put("url", url);
        return ResponseEntity.ok().body(response);

    }

    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") String id,Principal principal) throws Exception {
        String username = principal.getName();
        User user = userService.findByPhoneNumber(username);
        Post post = postService.findById(id);
        User postOwner = post.getPoster();
        HashMap<String,String> data = PostResponse.getData(user, post);

        HashMap<String,String> author = PostResponse.getAuthor(postOwner);
        ArrayList<User> blockList = postOwner.getBlockList();
        Boolean is_blocked = (blockList != null && blockList.contains(user))?true:false;
        Boolean can_edit = user.getUserId().equals(postOwner.getUserId())?true:false;

        GetPostResponse response = new GetPostResponse();
        response.setAuthor(author);
        response.setData(data);
        response.setCan_edit(can_edit);
        response.set_blocked(is_blocked);
        // get media after defining File Storage
        // can_comment
        

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id,Principal principal) throws Exception
    {
        postService.deletePostById(id);
        return ResponseEntity.ok("Deleted "+id);
    }
}
