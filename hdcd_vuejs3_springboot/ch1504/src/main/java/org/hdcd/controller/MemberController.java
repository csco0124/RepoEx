package org.hdcd.controller;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Member;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register04")
	public List<Member> register04() {
		log.info("register04");

		List<Member> list = new ArrayList<Member>();

		Member member = new Member();
		list.add(member);

		Member member2 = new Member();
		list.add(member2);

		return list;
	}

}
