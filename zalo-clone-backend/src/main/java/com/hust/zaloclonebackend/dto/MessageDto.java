package com.hust.zaloclonebackend.dto;

import com.hust.zaloclonebackend.constant.Constant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {
    private String fromUser;

    private String toUser;

    private String content;

    private Constant.TransportActionEnum action;
}
