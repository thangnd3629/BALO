package com.hust.zaloclonebackend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
@RestController
@CrossOrigin
public class LoginController {
    @GetMapping("/login")
    public ResponseEntity<Map> home(@CurrentSecurityContext(expression = "authentication.name") String name) {
        Map<String, String> response = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        response.put("user", name);
        headers.set("Access-Control-Expose-Headers", "X-Auth-Token");
        return ResponseEntity.ok().headers(headers).body(response);
    }

    @GetMapping("/hello")
    public ResponseEntity<?> hello(){
        return ResponseEntity.ok("hello");
    }
}
