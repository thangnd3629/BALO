package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.dto.MessageDto;
import com.hust.zaloclonebackend.dto.OutputTransportDTO;
import com.hust.zaloclonebackend.dto.WrapperMessageDto;
import com.hust.zaloclonebackend.service.ZaloChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public void chattingChannel(InputTransportDTO dto, @Header("simpSessionId") String sessionId) {
        log.info("chattingChannel {}", dto);
        Constant.TransportActionEnum action = dto.getAction();
        switch (action){
            case INIT_USER_DATA:
                MessageDto output = MessageDto.builder()
                        .action(dto.getAction())
                        .object(dto.getToUser())
                        .message(dto.getContent())
                        .fromUserID(dto.getFromUser())
                        .toUserId(dto.getToUser())
                        .relationShipId(dto.getRelationShipId())
                        .build();
                this.messagingTemplate.convertAndSend("/topic/user/"+dto.getRelationShipId(), output);
                break;
            case SEND_MESSAGE:
                zaloChatService.getAndSaveMessage(dto);
                this.messagingTemplate.convertAndSend("/topic/user/"+dto.getRelationShipId());
                break;
            case FETCH_GROUP_MESSAGES:
                Pageable pageable = PageRequest.of(dto.getPageNumber(), dto.getPageSize(), Sort.by("timestamp").descending())
                WrapperMessageDto wrapperMessageDto = zaloChatService.getConversationMessage(dto.getRelationShipId(), pageable, Constant.TransportActionEnum.FETCH_GROUP_MESSAGES);
                Constant.TransportActionEnum action1;
                if (dto.getMessageId() == -1) {
                    action1 = Constant.TransportActionEnum.FETCH_GROUP_MESSAGES;
                } else {
                    action1 = Constant.TransportActionEnum.ADD_CHAT_HISTORY;
                }
                OutputTransportDTO response = OutputTransportDTO.builder()
                        .action(action1)
                        .object(wrapperMessageDto)
                        .build();
                this.messagingTemplate.convertAndSend("/topic/user/" + dto.getRelationShipId(), response);
                break;
            default:
                log.info("err");
                break;

        }
    }
}
