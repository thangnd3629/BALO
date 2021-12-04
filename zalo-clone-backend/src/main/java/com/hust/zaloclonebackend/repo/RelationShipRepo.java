package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Relationship;
import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationShipRepo extends JpaRepository<Relationship, Long> {
    Relationship findRelationshipByUserAAndUserB(User userA, User userB);
}
