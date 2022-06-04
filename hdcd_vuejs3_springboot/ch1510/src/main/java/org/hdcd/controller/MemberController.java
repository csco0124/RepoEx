package org.hdcd.controller;

import java.util.HashMap;
import java.util.Map;

import org.hdcd.domain.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register10")
	public ResponseEntity<Map<String, Member>> register10() {
		log.info("register10");

		Map<String, Member> map = new HashMap<String, Member>();

		Member member = new Member();
		map.put("key1", member);

		Member member2 = new Member();
		map.put("key2", member2);

		return new ResponseEntity<Map<String, Member>>(map, HttpStatus.OK);
	}

}
