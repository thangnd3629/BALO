package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.model.response.GlobalSearchingResponse;
import com.hust.zaloclonebackend.model.response.MessageSearchingResponse;
import com.hust.zaloclonebackend.model.response.UserSearchingResponse;
import org.springframework.data.domain.Pageable;

public interface SearchingService {

    UserSearchingResponse searchUser(Pageable pageable, String keyword);
    MessageSearchingResponse searchMessage(Pageable pageable, String keyword);
    GlobalSearchingResponse searchGlobal(Pageable pageable, String keyword);

}
