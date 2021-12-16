package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ConversationRepo extends CrudRepository<Conversation, String> {
    @Query("select c from Conversation c inner join c.users u1 on u1 = :sender inner join c.users u2 on u2 = :receiver ")
    Conversation getPrivateConversationByMembers(@Param("sender") User sender, @Param("receiver") User receiver);
}
