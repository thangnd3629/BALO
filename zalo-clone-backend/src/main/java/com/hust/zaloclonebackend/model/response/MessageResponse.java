package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.entity.Message;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {

    UserResponse sender;
    UserResponse receiver;
    Long messageId;
    String content;
    Date timestamp;

    @Builder
    public MessageResponse(Message message) {
        this.sender = UserResponse.builder().user(message.getSender()).build();
        this.receiver = UserResponse.builder().user(message.getReceiver()).build();
        this.messageId = message.getMessageId();
        this.content = message.getContent();
        this.timestamp = message.getTimestamp();
    }

}
