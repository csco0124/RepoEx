package org.hdcd.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register07")
	public ResponseEntity<String> register07() {
		log.info("register07");

		return new ResponseEntity<String>("HELLO", HttpStatus.OK);
	}

}
