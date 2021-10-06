package com.hust.zaloclonebackend.rest.service;

import com.hust.zaloclonebackend.rest.entity.Person;

import java.util.UUID;

public interface PersonService {

    Person findByPartyId(UUID partyId);
}
