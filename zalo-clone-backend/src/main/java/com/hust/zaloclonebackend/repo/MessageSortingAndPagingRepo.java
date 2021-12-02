package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MessageSortingAndPagingRepo extends PagingAndSortingRepository<Message, Long> {
    List<Message> findAllByRelationShipId(Pageable pageable, Long relationShipID);
}
