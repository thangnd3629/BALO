package com.hust.zaloclonebackend.service;

import java.util.List;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;

public interface PostService {
    Post save(Post post);
    Post findById(UUID id) throws Exception;
    List<User> findAllLikers (UUID id) throws Exception;
    List<Comment> findAllComments (UUID id) throws Exception;
}
