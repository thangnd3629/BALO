package com.hust.zaloclonebackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;

public interface PostService {
    Post save(Post post);
    Post findById(String id) throws Exception;
    List<User> findAllLikers (String id) throws Exception;
    List<Comment> findAllComments (String id) throws Exception;
    void deletePostById(String id);
}
