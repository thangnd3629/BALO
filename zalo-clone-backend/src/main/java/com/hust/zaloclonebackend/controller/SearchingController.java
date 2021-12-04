package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.service.SearchingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class SearchingController {

    SearchingService searchingService;

    @GetMapping(path = "/search-users-by-keyword/{keyword}")
    public ResponseEntity searchUsersByKeyword(@PathVariable("keyword") String keyword,
                                              Pageable pageable,
                                              Principal principal) {
        log.info("Start search users by keyword controller");
        return ResponseEntity.ok(searchingService.searchUser(pageable, keyword));
    }

    @GetMapping(path = "/search-messages-by-keyword/{keyword}")
    public ResponseEntity searchMessagesByKeyword(@PathVariable("keyword") String keyword,
                                              Pageable pageable,
                                              Principal principal) {
        log.info("Start search messages by keyword controller");
        return ResponseEntity.ok(searchingService.searchMessage(pageable, keyword));
    }

    @GetMapping(path = "/search-global-by-keyword/{keyword}")
    public ResponseEntity searchGlobalByKeyword(@PathVariable("keyword") String keyword,
                                                  Pageable pageable,
                                                  Principal principal) {
        log.info("Start search global by keyword controller");
        return ResponseEntity.ok(searchingService.searchGlobal(pageable, keyword));
    }

}
