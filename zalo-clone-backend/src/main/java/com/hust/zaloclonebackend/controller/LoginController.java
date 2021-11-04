package com.hust.zaloclonebackend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@CrossOrigin
public class LoginController {
    @RequestMapping(method = RequestMethod.GET, value = "/login")
    public ResponseEntity<Map> home(@CurrentSecurityContext(expression = "authentication.name") String name) {
        Map<String, String> response = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        response.put("user", name);
        headers.set("Access-Control-Expose-Headers", "X-Auth-Token");
        return ResponseEntity.ok().headers(headers).body(response);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/hello")
    public String sayHello() {
        return "Swagger Hello World";
    }
}
