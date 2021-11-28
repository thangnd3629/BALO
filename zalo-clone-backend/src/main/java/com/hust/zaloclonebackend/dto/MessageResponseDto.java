package com.hust.zaloclonebackend.dto;

import com.hust.zaloclonebackend.constant.Constant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponseDto {
    private Object object;

    private Constant.TransportActionEnum action;
}
