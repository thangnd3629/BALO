package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.MessageDto;
import com.hust.zaloclonebackend.dto.MessageResponseDto;
import com.hust.zaloclonebackend.service.ZaloChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Slf4j
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ZaloChatService zaloChatService;

    @MessageMapping("/message")
    public void chattingChannel(MessageDto dto, @Header("simpSessionId") String sessionId) {
        log.info("chattingChannel {}", dto);
        Constant.TransportActionEnum action = dto.getAction();
        switch (action){
            case INIT_USER_DATA:
                MessageResponseDto output = MessageResponseDto.builder()
                        .action(dto.getAction())
                        .object(dto.getToUser())
                        .build();
                this.messagingTemplate.convertAndSend("/topic/user/"+dto.getToUser(), output);
                break;
            case SEND_MESSAGE:
                zaloChatService.getAndSaveMessage(dto);
                this.messagingTemplate.convertAndSend("/topic/user/"+dto.getToUser());
                break;
            default:
                log.info("err");
                break;

        }
    }
}
