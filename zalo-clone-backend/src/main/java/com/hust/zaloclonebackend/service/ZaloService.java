package com.hust.zaloclonebackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import org.springframework.data.domain.Pageable;

public interface ZaloService {
    Post save(Post post);

    Post findById(String id) throws Exception;

    List<User> findAllLikers (String id) throws Exception;

    List<Comment> findAllComments (String id) throws Exception;
    ModelDeletePostResponse deletePostById(String id) throws Exception;

    ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception;

    ModelGetPostResponse getPostById(String id) throws Exception;

    ModelGetListPostResponse getUserListPost(Pageable pageable, String phoneNumber);

    ModelEditPostResponse editPost(ModelEditPostRequest modelEditPostRequest);

    ZaloStatus reportPost(ModelReportPost modelReportPost, String phoneNumber);

    ZaloStatus addComment(ModelAddComment modelAddComment, String phoneNumber);

    ModelGetCommentPagingResponse getCommentPaging(Pageable pageable, String postId);

    ZaloStatus editComment(ModelEditComment modelEditComment);

    ModelLikePostResponse likePost(String phoneNumber, String postId);
}