package com.hust.zaloclonebackend.service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hust.zaloclonebackend.entity.*;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.repo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ZaloServiceImpl implements ZaloService {

    private PostRepo postRepo;
    private ImageRepo imageRepo;
    private UserRepo userRepo;
    private PostPagingAndSortingRepo postPagingAndSortingRepo;
    private ReportRepo reportRepo;
    private CommentRepo commentRepo;
    private CommentPagingAndSortingRepo commentPagingAndSortingRepo;

    @Override
    public Post save(Post post) {
        return postRepo.save(post);
    }
    @Override
    public Post findById(String id) throws Exception {
        if (postRepo.existsById(id)) return postRepo.findById(id).get();
        else throw new Exception("No user found"); //custom for handler later
    }
    @Override
    public List<User> findAllLikers(String id) throws Exception {
        if (!postRepo.existsById(id)) throw new Exception("No user found"); //custom for handler later
        Post post = postRepo.findById(id).get();
        return post.getLikers();
    }
    @Override
    public List<Comment> findAllComments(String id) throws Exception {
        if (!postRepo.existsById(id)) throw new Exception("No user found"); //custom for handler later
        Post post = postRepo.findById(id).get();
        return post.getComments();   
    }
    @Override
    public ModelDeletePostResponse deletePostById(String id) throws Exception {
        Post p = postRepo.findPostByPostId(id);
        imageRepo.deleteAllByPost(p);
        commentRepo.deleteAllByPost(p);
        postRepo.deletePostByPostId(id);
        return ModelDeletePostResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .build();
    }

    @Override
    public ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception {
        try {
            Post post = Post.builder()
                    .poster(user)
                    .content(modelAddPost.getDescribe())
                    .build();
            Post finalPost = postRepo.save(post);
            modelAddPost.getImage().forEach(image -> {
                Image image1 = Image.builder()
                        .post(finalPost)
                        .value(image)
                        .build();
                imageRepo.save(image1);
            });
            return ModelAddPostResponse.builder()
                    .zaloStatus(ZaloStatus.OK)
                    .postId(finalPost.getPostId())
                    .url("/"+user.getPhoneNumber()+"/"+ post.getPostId())
                    .build();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ModelGetPostResponse getPostById(String id) throws Exception {
        try {
            Post post = postRepo.findPostByPostId(id);
            ModelGetPostBody modelGetPostBody = ModelGetPostBody.builder()
                    .id(post.getPostId())
                    .createAt(post.getCreatedDate())
                    .describe(post.getContent())
                    .numComment(post.getComments().size())
                    .numLike(post.getLikers().size())
                    .build();
            List<String> images = imageRepo.findAllImageValueByPost(post);
            ModelGetPostResponse modelGetPostResponse = ModelGetPostResponse.builder()
                    .modelGetPostBody(modelGetPostBody)
                    .image(images)
                    .zaloStatus(ZaloStatus.OK)
                    .build();
            return modelGetPostResponse;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ModelGetListPostResponse getUserListPost(Pageable pageable, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        List<Post> list = postPagingAndSortingRepo.findAllByPoster(pageable, user);
        List<ModelGetPostResponse> modelGetPostResponseArrayList = new ArrayList<>();
        list.forEach(post -> {
            ModelGetPostBody modelGetPostBody = ModelGetPostBody.builder()
                    .id(post.getPostId())
                    .createAt(post.getCreatedDate())
                    .describe(post.getContent())
                    .numComment(post.getComments().size())
                    .numLike(post.getLikers().size())
                    .build();
            List<String> images = imageRepo.findAllImageValueByPost(post);
            ModelGetPostResponse modelGetPostResponse = ModelGetPostResponse.builder()
                    .modelGetPostBody(modelGetPostBody)
                    .image(images)
                    .build();
            modelGetPostResponseArrayList.add(modelGetPostResponse);
        });

       ModelGetListPostResponse modelGetListPostResponse = ModelGetListPostResponse.builder()
               .data(modelGetPostResponseArrayList)
               .zaloStatus(ZaloStatus.OK)
               .build();
       return modelGetListPostResponse;
    }

    @Override
    public ModelEditPostResponse editPost(ModelEditPostRequest modelEditPostRequest) {
        Post post = postRepo.findPostByPostId(modelEditPostRequest.getId());
        modelEditPostRequest.getImage().forEach(image -> {
            Image image1 = Image.builder()
                    .post(post)
                    .value(image)
                    .build();
            imageRepo.save(image1);
        });
        modelEditPostRequest.getImageDelId().forEach(s -> imageRepo.deleteById(s));
        postRepo.save(post);
        return ModelEditPostResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .build();
    }

    @Override
    public ZaloStatus reportPost(ModelReportPost modelReportPost, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelReportPost.getId());
        if(post == null){
            return ZaloStatus.POST_NOT_EXISTED;
        }
        Report report = Report.builder()
                .post(post)
                .detail(modelReportPost.getDetails())
                .subject(modelReportPost.getSubject())
                .user(user)
                .build();
        reportRepo.save(report);
        return ZaloStatus.OK;
    }

    @Override
    public ZaloStatus addComment(ModelAddComment modelAddComment, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelAddComment.getPostId());
        Comment comment = Comment.builder()
                .commentOwner(user)
                .post(post)
                .content(modelAddComment.getComment())
                .timestamp(new Date())
                .build();
        commentRepo.save(comment);
        return ZaloStatus.OK;
    }

    @Override
    public ModelGetCommentPagingResponse getCommentPaging(Pageable pageable, String postId) {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp").ascending());
        Post post = postRepo.findPostByPostId(postId);
        Page<Comment> commentPage = commentPagingAndSortingRepo.findAllByPost(post,pageable);
        List<ModelGetCommentResponse> list = new ArrayList<>();
        commentPage.forEach(comment -> {
            ModelCommenterResponse modelCommenterResponse = ModelCommenterResponse.builder()
                    .name(comment.getCommentOwner().getName())
                    .phoneNumber(comment.getCommentOwner().getPhoneNumber())
                    .avatar(comment.getCommentOwner().getAvatarLink())
                    .build();

            ModelGetCommentResponse modelGetCommentResponse = ModelGetCommentResponse.builder()
                    .comment(comment.getContent())
                    .commenter(modelCommenterResponse)
                    .createAt(comment.getTimestamp())
                    .id(comment.getCommentId())
                    .build();
            list.add(modelGetCommentResponse);
        });
        return ModelGetCommentPagingResponse.builder()
                .list(list)
                .build();
    }

}