package com.hust.zaloclonebackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelAddPost;
import com.hust.zaloclonebackend.model.ModelAddPostResponse;
import com.hust.zaloclonebackend.model.ModelDeletePostResponse;
import com.hust.zaloclonebackend.model.ModelGetPostResponse;

public interface PostService {
    Post save(Post post);
    Post findById(String id) throws Exception;
    List<User> findAllLikers (String id) throws Exception;
    List<Comment> findAllComments (String id) throws Exception;
    ModelDeletePostResponse deletePostById(String id) throws Exception;

    ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception;

    ModelGetPostResponse getPostById(String id) throws Exception;
}
