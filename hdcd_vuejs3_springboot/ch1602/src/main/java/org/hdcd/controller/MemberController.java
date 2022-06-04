package org.hdcd.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {
	
	@GetMapping("/register/{userId}")
	public ResponseEntity<String> register01(@PathVariable("userId") String userId) {
		log.info("register01");
		
		log.info("userId = " + userId);
		
		ResponseEntity<String> entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
	@PostMapping("/register/{userId}/{password}")
	public ResponseEntity<String> register02(@PathVariable("userId") String userId, @PathVariable("password") String password) {
		log.info("register02");
		
		log.info("userId = " + userId);
		log.info("password = " + password);
		
		ResponseEntity<String> entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
	@PostMapping("/register03")
	public ResponseEntity<String> register03(String userId) {
		log.info("register03");
		
		log.info("userId = " + userId);
		
		ResponseEntity<String> entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
	@PostMapping("/register04")
	public ResponseEntity<String> register04(@RequestParam("userId") String userId, @RequestParam("password") String password) {
		log.info("register04");
		
		log.info("userId = " + userId);
		log.info("password = " + password);
		
		ResponseEntity<String> entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
}
