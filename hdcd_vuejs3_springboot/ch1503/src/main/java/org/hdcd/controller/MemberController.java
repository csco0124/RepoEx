package org.hdcd.controller;

import org.hdcd.domain.Member;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping(path = "/register03", produces = "application/json")
	public Member register03() {
		log.info("register03");

		Member member = new Member();

		return member;
	}

}
