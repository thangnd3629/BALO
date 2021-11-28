package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.dto.MessageDto;

public interface ZaloChatService {
    void getAndSaveMessage(MessageDto dto);
}
