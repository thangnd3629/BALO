package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;



public interface UserRepo extends CrudRepository<User, String> {
    User findUserByUserId(String id);
    User getUserByUserId(String id);
    User findUserByName(String username);
    User findUserByPhoneNumber(String phoneNumber);

    @Query("select u from User u inner join u.conversations c where c = :conversation and u <> :user")
    User findConversationPartner(@Param("conv") Conversation conversation,@Param("user") User user);
}
