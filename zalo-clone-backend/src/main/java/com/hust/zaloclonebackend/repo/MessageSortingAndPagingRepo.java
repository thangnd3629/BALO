package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageSortingAndPagingRepo extends PagingAndSortingRepository<Message, Long> {
    List<Message> findAllByConservationId(Pageable pageable, String conservationId);

    @Query("select m from Message m   group by m.conservationId having m.sender = :toUser or m.receiver = :toUser")
    List<Message> getListMessageWithConservationId(Pageable pageable, @Param("toUser") User toUser);
    List<Message> findAllByRelationShipId(Pageable pageable, Long relationShipID);

    String SEARCH_BY_KEYWORD_CONDITION = "WHERE LOWER(mess.content) LIKE %:keyword% AND mess.isDeleted = false";
    @Query(value = "SELECT mess FROM Message mess " + SEARCH_BY_KEYWORD_CONDITION,
    countQuery = "SELECT COUNT (mess) FROM Message mess WHERE " + SEARCH_BY_KEYWORD_CONDITION)
    List<Message> searchByKeyword(Pageable pageable, @Param("keyword") String keyword);
}
