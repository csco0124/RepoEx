package org.hdcd.controller;

import java.util.HashMap;
import java.util.Map;

import org.hdcd.domain.Member;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register05")
	public Map<String, Member> register05() {
		log.info("register05");

		Map<String, Member> map = new HashMap<String, Member>();

		Member member = new Member();
		map.put("key1", member);

		Member member2 = new Member();
		map.put("key2", member2);

		return map;
	}

}
