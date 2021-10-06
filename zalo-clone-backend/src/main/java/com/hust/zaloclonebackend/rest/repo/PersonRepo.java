package com.hust.zaloclonebackend.rest.repo;

import com.hust.zaloclonebackend.rest.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface PersonRepo extends JpaRepository<Person, UUID> {

    Person findByPartyId(UUID partyId);
}
