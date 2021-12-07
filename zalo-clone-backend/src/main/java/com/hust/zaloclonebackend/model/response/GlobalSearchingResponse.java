package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class GlobalSearchingResponse extends BaseResponse {

    private DataBuilder data;

    @Builder
    public GlobalSearchingResponse(ZaloStatus zaloStatus, DataBuilder data) {
        super(zaloStatus);
        this.data = data;
    }

    @Builder
    public static class DataBuilder {
        public Set<UserResponse> users;
        public Set<MessageResponse> messages;
    }

}
