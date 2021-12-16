package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.ConversationType;
import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.ConversationRepo;
import com.hust.zaloclonebackend.repo.MessageRepo;
import com.hust.zaloclonebackend.repo.MessageSortingAndPagingRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Component
@Slf4j
public class ZaloChatServiceImpl implements ZaloChatService {
    private final MessageRepo messageRepo;

    private final UserRepo userRepo;

    private final MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    private final ConversationRepo conversationRepo;

    public ZaloChatServiceImpl(MessageRepo messageRepo, UserRepo userRepo, MessageSortingAndPagingRepo messageSortingAndPagingRepo, ConversationRepo conversationRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.messageSortingAndPagingRepo = messageSortingAndPagingRepo;
        this.conversationRepo = conversationRepo;
    }


    @Override
    public Conversation initializePrivateConversation(List<User> users) {
        assert users.size() == 2;
        Conversation conversation = Conversation.builder().conversationType(ConversationType.PRIVATE_CHAT).users(users).build();
        conversationRepo.save(conversation);
        return conversation;
    }


    @Override
    public void sendPrivateMessage(InputTransportDTO dto) {
        User receiver = userRepo.getUserByUserId(dto.getToUser());
        User sender = userRepo.getUserByUserId(dto.getFromUser());
        Conversation existingConv = conversationRepo.getPrivateConversationByMembers(sender, receiver);
        if (existingConv == null) {
            List<User> conversationMember = new ArrayList<>(Arrays.asList(sender, receiver));
            existingConv = initializePrivateConversation(conversationMember);
        }
        Message message = Message.builder().content(dto.getContent()).conversation(existingConv).sender(sender).timestamp(new Date()).build();
        messageRepo.save(message);

    }
}
