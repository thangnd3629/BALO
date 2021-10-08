package com.hust.zaloclonebackend.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelPost;
import com.hust.zaloclonebackend.service.PostServiceImpl;
import com.hust.zaloclonebackend.service.UserServiceImpl;
import com.hust.zaloclonebackend.util.EpochConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping("/post/add")
    public ResponseEntity<?> addPost(@RequestBody ModelPost modelPost) throws ParseException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Post post = new Post();
        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        post.setContent(modelPost.getDescribe());
        post.setPoster(user);
        post.setCreatedDate(EpochConverter.getCurrentEpoch());
        postService.save(post);

        HashMap<String, String> response = new HashMap<>();
        String baseUrl = "unkown"; // ?
        String postId = post.getPostId().toString();
        String url = baseUrl + "/" + username + "/posts" + postId;
        response.put("url", url);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") UUID id) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        Post post = postService.findById(id);
        HashMap<String, String> response = new HashMap<>();
        response.put("id", id.toString());
        response.put("created on", EpochConverter.fromEpochToDate(post.getCreatedDate()));
        response.put("modified on", EpochConverter.fromEpochToDate(post.getModifiedDate()));
        response.put("likes", "" + post.getLikers().size());
        response.put("comments", "" + post.getComments());
        List<Post> likedPost = user.getLikedPosts();

        response.put("is_liked", likedPost.contains(post) ? "1" : "0");
        // get media after defining File Storage
        return ResponseEntity.ok().body(response);
    }
}
