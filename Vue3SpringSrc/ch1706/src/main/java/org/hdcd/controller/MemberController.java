package org.hdcd.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register06")
	public ResponseEntity<Void> register06() {
		log.info("register06");

		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
