package com.hust.zaloclonebackend.repo;

import java.util.Optional;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Post;

import org.springframework.data.repository.CrudRepository;

public interface PostRepo extends CrudRepository<Post, UUID> {
    
}
