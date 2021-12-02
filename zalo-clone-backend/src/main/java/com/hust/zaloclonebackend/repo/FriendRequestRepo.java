package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.FriendRequest;
import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRequestRepo extends JpaRepository<FriendRequest, Long> {
    void deleteFriendRequestByFromUserAndToUser(User fromUser, User toUser);
}
