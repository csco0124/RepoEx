package org.hdcd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@GetMapping("/register01")
	public void register01() {
		log.info("register01");
	}

}
