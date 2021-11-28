package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.dto.MessageDto;
import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.MessageRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Slf4j
public class ZaloChatServiceImpl implements ZaloChatService{
    private final MessageRepo messageRepo;

    private final UserRepo userRepo;

    public ZaloChatServiceImpl(MessageRepo messageRepo, UserRepo userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void getAndSaveMessage(MessageDto dto) {
        User sender = userRepo.findUserByPhoneNumber(dto.getFromUser());
        User receiver = userRepo.findUserByPhoneNumber(dto.getToUser());
        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(dto.getContent())
                .timestamp(new Date())
                .build();
        messageRepo.save(message);
    }
}
