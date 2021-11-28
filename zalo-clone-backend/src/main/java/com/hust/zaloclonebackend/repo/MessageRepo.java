package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Message, Long> {
}
