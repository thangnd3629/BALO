package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelEditPostResponse {
    private ZaloStatus zaloStatus;
}
