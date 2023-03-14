package org.hdcd.controller;

import java.time.LocalDate;

import org.hdcd.domain.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Member member) {
		log.info("register");
		
		log.info("userId = " + member.getUserId());
		log.info("password = " + member.getPassword());
		
		log.info("member.getDateOfBirth() = " + member.getDateOfBirth());
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@GetMapping("/read")
	public ResponseEntity<Member> read() {
		log.info("register");
		
		Member member = new Member();
		member.setUserId("hongkd");
		member.setPassword("1234");
		
		LocalDate dateOfBirth = LocalDate.of(1999, 5, 20);
		member.setDateOfBirth(dateOfBirth);
		
		return new ResponseEntity<Member>(member, HttpStatus.OK);
	}
	
}
