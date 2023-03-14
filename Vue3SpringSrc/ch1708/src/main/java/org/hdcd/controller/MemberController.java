package org.hdcd.controller;

import org.hdcd.domain.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register08")
	public ResponseEntity<Member> register08() {
		log.info("register08");

		Member member = new Member();

		return new ResponseEntity<Member>(member, HttpStatus.OK);
	}

}
