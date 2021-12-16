package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ModelGetListConversation extends BaseResponse {
    private List<ModelGetListConversationItem> data;
    private int numNewMessage;

}
