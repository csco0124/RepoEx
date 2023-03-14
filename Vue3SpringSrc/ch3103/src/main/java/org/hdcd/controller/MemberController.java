package org.hdcd.controller;

import org.hdcd.domain.Member;
import org.hdcd.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class MemberController {

	private final MemberService service;

	@PostMapping
	public ResponseEntity<Member> register(@Validated @RequestBody Member member) throws Exception {
		log.info("register");
		
		service.register(member);

		log.info("register member.getUserNo() = " + member.getUserNo());
		
		return new ResponseEntity<>(member, HttpStatus.OK);
	}

}
