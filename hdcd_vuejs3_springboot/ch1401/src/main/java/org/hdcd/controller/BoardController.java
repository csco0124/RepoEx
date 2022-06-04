package org.hdcd.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BoardController {

	@RequestMapping(value = "/boards/register")
	public String registerForm() {
		log.info("registerForm");
		
		return "REGISTER";
	}
	
	@RequestMapping(path = "/boards/modify")
	public String modifyForm() {
		log.info("modifyForm");
		
		return "MODIFY";
	}

	@RequestMapping("/boards/list")
	public String list() {
		log.info("list");
		
		return "LIST";
	}
	
}
