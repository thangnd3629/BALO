package com.hust.zaloclonebackend.rest.controller;

import com.hust.zaloclonebackend.rest.entity.Party;
import com.hust.zaloclonebackend.rest.entity.Person;
import com.hust.zaloclonebackend.rest.entity.UserLogin;
import com.hust.zaloclonebackend.rest.service.ApplicationService;
import com.hust.zaloclonebackend.rest.service.PersonService;
import com.hust.zaloclonebackend.rest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ApiController {

    private UserService userService;
    private PersonService personService;
    private ApplicationService applicationService;

    @GetMapping("/")
    public ResponseEntity<Map> home(@CurrentSecurityContext(expression = "authentication.name") String name) {
        Map<String, String> response = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        response.put("user", name);
        headers.set("Access-Control-Expose-Headers", "X-Auth-Token");
        return ResponseEntity.ok().headers(headers).body(response);
    }

    @GetMapping("/my-account")
    public ResponseEntity<?> getAccount(Principal principal) {
        UserLogin userLogin = userService.findById(principal.getName());
        Party party = userLogin.getParty();
        Person person = personService.findByPartyId(party.getPartyId());
        Map<String, String> response = new HashMap<>();
        response.put("name", person.getFullName());
        response.put("partyId", person.getPartyId().toString());
        response.put("user", principal.getName());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("screen-security")
    public ResponseEntity<?> getScrSecurInfo(Principal principal) {
        return ResponseEntity.ok().body(applicationService.getScrSecurInfo(principal.getName()));
    }
}
