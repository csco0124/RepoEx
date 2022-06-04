package org.hdcd.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {
	
	@RequestMapping("/register")
	public String registerForm() {
		log.info("registerForm");
		
		return "REGISTER";
	}
	
	@RequestMapping("/modify")
	public String modifyForm() {
		log.info("modifyForm");
		
		return "MODIFY";
	}

	@RequestMapping("/list")
	public String list() {
		log.info("list");
		
		return "LIST";
	}
	
	@RequestMapping("/read/{boardNo}")
	public String read(@PathVariable int boardNo) {
		log.info("read boardNo : " + boardNo);
		
		return "READ boardNo : " + boardNo;
	}
	
}
