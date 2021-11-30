package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.dto.WrapperMessageDto;
import org.springframework.data.domain.Pageable;

public interface ZaloChatService {
    void getAndSaveMessage(InputTransportDTO dto);

    WrapperMessageDto getConversationMessage(Long relationShipId, Pageable pageable, Constant.TransportActionEnum action);
}
