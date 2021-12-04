package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.response.*;
import com.hust.zaloclonebackend.repo.MessageSortingAndPagingRepo;
import com.hust.zaloclonebackend.repo.UserPagingAndSortingRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SearchingServiceImpl implements SearchingService {

    UserPagingAndSortingRepo userPagingAndSortingRepo;

    MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    @Override
    public UserSearchingResponse searchUser(Pageable pageable, String keyword) {
        log.info("Start search user with keyword " + keyword);
        List<User> users = userPagingAndSortingRepo.searchByKeyword(pageable, keyword.toLowerCase());

        if (CollectionUtils.isEmpty(users)) {
            log.info("Users is empty");
            return UserSearchingResponse.builder()
                    .zaloStatus(ZaloStatus.NO_DATA)
                    .build();
        }

        Set<UserResponse> userResponses = users.stream()
                .map(user -> UserResponse.builder().user(user).build())
                .collect(Collectors.toSet());
        return UserSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(userResponses)
                .build();
    }

    @Override
    public MessageSearchingResponse searchMessage(Pageable pageable, String keyword) {
        log.info("Start search message with keyword = " + keyword);
        List<Message> messages = messageSortingAndPagingRepo.searchByKeyword(pageable, keyword.toLowerCase());

        if (CollectionUtils.isEmpty(messages)) {
            log.info("Not found any message satisfy");
            return MessageSearchingResponse.builder()
                    .zaloStatus(ZaloStatus.NO_DATA)
                    .data(null)
                    .build();
        }

        Set<MessageResponse> messageResponses = messages.stream()
                .map(mess -> MessageResponse.builder().message(mess).build())
                .collect(Collectors.toSet());
        return MessageSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(messageResponses)
                .build();
    }

    @Override
    public GlobalSearchingResponse searchGlobal(Pageable pageable, String keyword) {
        log.info("Start global search user with keyword " + keyword);
        List<User> users = userPagingAndSortingRepo.searchByKeyword(pageable, keyword.toLowerCase());
        List<Message> messages = messageSortingAndPagingRepo.searchByKeyword(pageable, keyword.toLowerCase());

        if (CollectionUtils.isEmpty(users) && CollectionUtils.isEmpty(messages)) {
            log.info("Not found any user or message satisfy");
            return GlobalSearchingResponse.builder()
                    .zaloStatus(ZaloStatus.NO_DATA)
                    .data(null)
                    .build();
        }

        Set<UserResponse> userResponses = users.stream()
                .map(user -> UserResponse.builder().user(user).build())
                .collect(Collectors.toSet());
        Set<MessageResponse> messageResponses = messages.stream()
                .map(message -> MessageResponse.builder().message(message).build())
                .collect(Collectors.toSet());

        return GlobalSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(GlobalSearchingResponse.DataBuilder.builder()
                        .users(userResponses)
                        .messages(messageResponses)
                        .build())
                .build();
    }
}
