package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.dto.MessageDto;
import com.hust.zaloclonebackend.dto.WrapperMessageDto;
import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.MessageRepo;
import com.hust.zaloclonebackend.repo.MessageSortingAndPagingRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Component
@Slf4j
public class ZaloChatServiceImpl implements ZaloChatService{
    private final MessageRepo messageRepo;

    private final UserRepo userRepo;

    private final MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    public ZaloChatServiceImpl(MessageRepo messageRepo, UserRepo userRepo, MessageSortingAndPagingRepo messageSortingAndPagingRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.messageSortingAndPagingRepo = messageSortingAndPagingRepo;
    }

    @Override
    public void getAndSaveMessage(InputTransportDTO dto) {
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

    @Override
    public WrapperMessageDto getConversationMessage(Long relationShipId, Pageable pageable, Constant.TransportActionEnum action) {

        List<Message> list = messageSortingAndPagingRepo.findAllByRelationShipId(pageable, relationShipId);
        Long lastMessageId = list != null && list.size() != 0 ? list.get(0).getMessageId() : 0;
        if(list != null){
            List<MessageDto> list1 = list.stream().map(message -> convertMessageToMessageDto(message, relationShipId, action)).collect(Collectors.toList());
            return WrapperMessageDto.builder()
                    .isLastMessage(list.size() != 0)
                    .messages(list1)
                    .build();
        }
        List<MessageDto> messageDTOS = new ArrayList<>();
        return WrapperMessageDto.builder()
                .messages(messageDTOS)
                .build();

    }

    private MessageDto convertMessageToMessageDto(Message message, Long relationShipId, Constant.TransportActionEnum action){
        return MessageDto.builder()
                .toUserId(message.getReceiver().getUserId())
                .fromUserID(message.getSender().getUserId())
                .relationShipId(relationShipId)
                .message(message.getContent())
                .action(action)
                .object(null)
                .build();
    }


}
