package com.hust.zaloclonebackend.service;
import java.util.ArrayList;
import java.util.List;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Image;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.repo.ImageRepo;
import com.hust.zaloclonebackend.repo.PostPagingAndSortingRepo;
import com.hust.zaloclonebackend.repo.PostRepo;

import com.hust.zaloclonebackend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostServiceImpl implements PostService {

    PostRepo postRepo;
    ImageRepo imageRepo;
    UserRepo userRepo;
    PostPagingAndSortingRepo postPagingAndSortingRepo;
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
        try {
            Post p = postRepo.findPostByPostId(id);

            imageRepo.deleteAllByPost(p);
            postRepo.deletePostByPostId(id);
            return ModelDeletePostResponse.builder()
                    .zaloStatus(ZaloStatus.OK)
                    .build();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }

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
        modelEditPostRequest.getImageDelId().forEach(s -> {
            imageRepo.deleteById(s);
        });
        postRepo.save(post);
        return ModelEditPostResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .build();
    }
}
