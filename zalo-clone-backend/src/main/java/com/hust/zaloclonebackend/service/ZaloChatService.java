package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.dto.WrapperMessageDto;
import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelGetListConversation;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ZaloChatService {
    Conversation initializePrivateConversation(List<User> users);
    void sendPrivateMessage(InputTransportDTO dto);
    ModelGetListConversation getListConversation(String name, Pageable pageable);
}
