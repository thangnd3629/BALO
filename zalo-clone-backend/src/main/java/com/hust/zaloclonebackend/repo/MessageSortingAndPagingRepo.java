package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MessageSortingAndPagingRepo extends PagingAndSortingRepository<Message, Long> {
    List<Message> findAllByConservationId(Pageable pageable, String conservationId);

    @Query("select m from Message m   group by m.conservationId having m.sender = :toUser or m.receiver = :toUser")
    List<Message> getListMessageWithConservationId(Pageable pageable, @Param("toUser") User toUser);
}
