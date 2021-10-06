package com.hust.zaloclonebackend.rest.service;

import com.hust.zaloclonebackend.rest.entity.Person;
import com.hust.zaloclonebackend.rest.repo.PersonRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PersonServiceImpl implements PersonService {

    PersonRepo personRepo;

    @Override
    public Person findByPartyId(UUID partyId) {
        return personRepo.findByPartyId(partyId);
    }
}
