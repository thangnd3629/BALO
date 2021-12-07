package com.hust.zaloclonebackend.service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.hust.zaloclonebackend.entity.*;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.model.response.ModelGetListConservation;
import com.hust.zaloclonebackend.repo.*;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ZaloServiceImpl implements ZaloService {

    private PostRepo postRepo;
    private ImageRepo imageRepo;
    private UserRepo userRepo;
    private PostPagingAndSortingRepo postPagingAndSortingRepo;
    private ReportRepo reportRepo;
    private CommentRepo commentRepo;
    private CommentPagingAndSortingRepo commentPagingAndSortingRepo;
    private FriendRequestRepo friendRequestRepo;
    private FriendRequestPagingAndSortingRepo friendRequestPagingAndSortingRepo;
    private RelationShipRepo relationShipRepo;
    private MessageRepo messageRepo;
    private MessageSortingAndPagingRepo messageSortingAndPagingRepo;
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
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception {
        log.info("modelAddPost {}", modelAddPost);
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
                    .code(ZaloStatus.OK.getCode())
                    .message(ZaloStatus.OK.getMessage())
                    .id(finalPost.getPostId())
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
           return convertPostToModelGetPostResponse(post);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    private ModelGetListPostBody convertPostToModelGetListPostBody(Post post){
        Integer isLike = 0;
        User poster = post.getPoster();
        for(User u : post.getLikers()){
            if(u.getPhoneNumber().equals(poster.getPhoneNumber())){
                isLike=1;
            }
        }
        ModelAuthor modelAuthor = ModelAuthor.builder()
                .avartar(poster.getAvatarLink())
                .name(poster.getName())
                .id(poster.getUserId())
                .build();
        List<String> images = imageRepo.findAllImageValueByPost(post);

        return ModelGetListPostBody.builder()
                .id(post.getPostId())
                .createAt(post.getCreatedDate())
                .describe(post.getContent())
                .numComment(post.getComments().size())
                .like(post.getLikers().size())
                .isLike(isLike)
                .author(modelAuthor)
                .image(images)
                .build();
    }

    private ModelGetPostResponse convertPostToModelGetPostResponse(Post post){
        Integer isLike = 0;
        User poster = post.getPoster();
        for(User u : post.getLikers()){
            if(u.getPhoneNumber().equals(poster.getPhoneNumber())){
                isLike=1;
            }
        }
        ModelGetPostBody modelGetPostBody = ModelGetPostBody.builder()
                .id(post.getPostId())
                .createAt(post.getCreatedDate())
                .describe(post.getContent())
                .numComment(post.getComments().size())
                .like(post.getLikers().size())
                .isLike(isLike)
                .build();
        ModelAuthor modelAuthor = ModelAuthor.builder()
                .avartar(poster.getAvatarLink())
                .name(poster.getName())
                .id(poster.getUserId())
                .build();
        List<String> images = imageRepo.findAllImageValueByPost(post);
        return ModelGetPostResponse.builder()
                .data(modelGetPostBody)
                .image(images)
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .author(modelAuthor)
                .build();
    }

    @Override
    public ModelGetListPostResponse getListPostPaging(String phoneNumber, Pageable pageable) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        List<Post> list = postPagingAndSortingRepo.getPostNewFeedByUser(pageable, user);
        List<ModelGetListPostBody>  list1 = list.stream().map(post -> convertPostToModelGetListPostBody(post)).collect(Collectors.toList());
        return ModelGetListPostResponse.builder()
                .message(ZaloStatus.OK.getMessage())
                .code(ZaloStatus.OK.getCode())
                .data(list1)
                .build();
    }

    @Override
    public ModelGetListFriendRequest getListFriendRequest(String phoneNumber, Pageable pageable) {
        log.info("pageable {}", pageable);
        User toUser = userRepo.findUserByPhoneNumber(phoneNumber);
        List<FriendRequest> list = friendRequestPagingAndSortingRepo.findAllByToUser(pageable, toUser);
        log.info("list {}", list.size());
        List<ModelGetFriendRequest> data = list.stream()
                .map(friendRequest -> convertUserInfoToModelGetFriendRequest(friendRequest.getFromUser(), friendRequest.getCreatedDate()))
                .collect(Collectors.toList());
        return ModelGetListFriendRequest.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .data(data)
                .build();
    }

    @Override
    public ModelStatusResponse handleFriendRequest(String phoneNumber, ModelHandleFriendRequest request) {
        log.info("request {}", request);
        User toUSer = userRepo.findUserByPhoneNumber(phoneNumber);
        User fromUser = userRepo.findUserByUserId(request.getUserId());
        log.info("touser {} fromuser {}", toUSer.getPhoneNumber(), fromUser.getPhoneNumber());
        if(request.getIsAccept() == 1){
            Relationship relationship = Relationship.builder()
                    .userA(fromUser)
                    .userB(toUSer)
                    .build();
            relationShipRepo.save(relationship);
            log.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            Relationship relationship1 = Relationship.builder()
                    .userA(toUSer)
                    .userB(fromUser)
                    .build();
            relationShipRepo.save(relationship1);
        }
        log.info("11111");
        FriendRequest friendRequest = friendRequestRepo.findFriendRequestByFromUserAndToUser(fromUser, toUSer);
        if(friendRequest != null)
            friendRequestRepo.deleteById(friendRequest.getId());
//        friendRequestRepo.deleteByFromUserAndToUser(fromUser, toUSer);
        log.info("222");

        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelSendFriendRequestResponse sendFriendRequest(String phoneNumber, String userId) {
        User fromUser = userRepo.findUserByPhoneNumber(phoneNumber);
        User toUser = userRepo.findUserByUserId(userId);
        Relationship relationship = relationShipRepo.findRelationshipByUserAAndUserB(fromUser, toUser);
        log.info("relationship {}", relationship);
        if(relationship != null){
            return ModelSendFriendRequestResponse.builder()
                    .code(8888)
                    .message("They are friend")
                    .build();
        }
        friendRequestRepo.save(FriendRequest.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .createdDate(new Date())
                .build());
        return ModelSendFriendRequestResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelGetListConservation getListConservationByUser(Pageable pageable, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        List<Message> list = messageSortingAndPagingRepo.getListMessageWithConservationId(pageable, user);
        List<ModelConservation> data = new ArrayList<>();
        int numNewMessage = 0;
        for(Message message : list){
            ModelLastMessage lastMessage = ModelLastMessage.builder()
                    .message(message.getContent())
                    .createdAt(message.getTimestamp())
                    .unread(message.getSeen())
                    .build();
            ModelAuthor author = ModelAuthor.builder()
                    .id(message.getSender().getUserId())
                    .name(message.getSender().getName())
                    .avartar(message.getSender().getAvatarLink())
                    .build();
            ModelConservation conservation = ModelConservation.builder()
                    .id(message.getConservationId())
                    .lastMessage(lastMessage)
                    .partner(author)
                    .build();
            numNewMessage += 1 - (message.getSeen() == 0 ? 0 : 1);
            data.add(conservation);
        }
        return ModelGetListConservation.builder()
                .numNewMessage(numNewMessage)
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .data(data)
                .build();

    }

    @Override
    public ModelGetListMessage getListMessagePaging(Pageable pageable, ModelGetMessageRequest request, String phoneNumber) {
        List<Message> list = messageSortingAndPagingRepo.findAllByConservationId(pageable, request.getConservationId());
        List<ModelMessageConservation> data = new ArrayList<>();
        for(Message message: list){
            ModelAuthor author = ModelAuthor.builder()
                    .id(message.getSender().getUserId())
                    .name(message.getSender().getName())
                    .avartar(message.getSender().getAvatarLink())
                    .build();
            ModelMessage modelMessage = ModelMessage.builder()
                    .message(message.getContent())
                    .messageId(message.getMessageId())
                    .unread(1-message.getSeen())
                    .created(message.getTimestamp())
                    .sender(author)
                    .build();
            ModelMessageConservation modelMessageConservation = ModelMessageConservation.builder()
                    .conversation(modelMessage)
                    .isBlocked(0)
                    .build();
            data.add(modelMessageConservation);
        }
        return ModelGetListMessage.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .data(data)
                .build();
    }


    private ModelGetFriendRequest convertUserInfoToModelGetFriendRequest(User user, Date date){
        return ModelGetFriendRequest.builder()
                .avatar(user.getAvatarLink())
                .userName(user.getName())
                .id(user.getUserId())
                .created(date)
                .build();
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
                    .like(post.getLikers().size())
                    .build();
            List<String> images = imageRepo.findAllImageValueByPost(post);
            ModelGetPostResponse modelGetPostResponse = ModelGetPostResponse.builder()
                    .data(modelGetPostBody)
                    .image(images)
                    .build();
            modelGetPostResponseArrayList.add(modelGetPostResponse);
        });

       ModelGetListPostResponse modelGetListPostResponse = ModelGetListPostResponse.builder()
//               .data(modelGetPostResponseArrayList)
               .code(ZaloStatus.OK.getCode())
               .message(ZaloStatus.OK.getMessage())
               .build();
       return modelGetListPostResponse;
    }

    @Override
    public ModelStatusResponse editPost(ModelEditPostRequest modelEditPostRequest) {
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
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse reportPost(ModelReportPost modelReportPost, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelReportPost.getId());
        if(post == null){
//            return ZaloStatus.POST_NOT_EXISTED;
            return ModelStatusResponse.builder()
                    .code(ZaloStatus.POST_NOT_EXISTED.getCode())
                    .message(ZaloStatus.POST_NOT_EXISTED.getMessage())
                    .build();
        }
        Report report = Report.builder()
                .post(post)
                .detail(modelReportPost.getDetails())
                .subject(modelReportPost.getSubject())
                .user(user)
                .build();
        reportRepo.save(report);
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse addComment(ModelAddComment modelAddComment, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelAddComment.getPostId());
        Comment comment = Comment.builder()
                .commentOwner(user)
                .post(post)
                .content(modelAddComment.getComment())
                .timestamp(new Date())
                .build();
        commentRepo.save(comment);
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
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
                .data(list)
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse editComment(ModelEditComment modelEditComment) {
        Comment comment = commentRepo.findCommentByCommentId(modelEditComment.getCommentId());
        comment.setContent(modelEditComment.getComment());
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();    }

    @Override
    public ModelLikePostResponse likePost(String phoneNumber, String postId) {
        Post post = postRepo.findPostByPostId(postId);
        User u = userRepo.findUserByPhoneNumber(phoneNumber);
        post.getLikers().add(u);
        postRepo.save(post);
        ModelLikePostResponse modelLikePostResponse = ModelLikePostResponse.builder()
                .like(post.getLikers().size())
                .build();
        return modelLikePostResponse;
    }



}
