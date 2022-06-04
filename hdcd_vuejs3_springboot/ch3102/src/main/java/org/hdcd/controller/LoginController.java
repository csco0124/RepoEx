package org.hdcd.controller;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.AuthenticationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class LoginController {

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody AuthenticationRequest authenticationRequest) {
		String username = authenticationRequest.getUsername();
		String password = authenticationRequest.getPassword();

		log.info("username = " + username + " password = " + password);
		
		List<String> roles = new ArrayList<String>();
		roles.add("ROLE_MEMBER");

		String token = username + "_" + roles;

		log.info("token : " + token);
		
		return new ResponseEntity<String>(token, HttpStatus.OK);
	}
	
}
