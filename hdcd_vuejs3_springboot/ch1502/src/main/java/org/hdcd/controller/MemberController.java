package org.hdcd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register02")
	public String register02() {
		log.info("register02");

		return "HELLO";
	}

}
