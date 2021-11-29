package com.hust.zaloclonebackend.repo;

import java.util.UUID;

import com.hust.zaloclonebackend.entity.Post;

import org.springframework.data.repository.CrudRepository;

public interface PostRepo extends CrudRepository<Post, String> {
    Post findPostByPostId(String uuid);
    void deletePostByPostId(String id);
}
