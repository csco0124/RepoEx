package org.hdcd.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/notice")
@Controller
public class NoticeController {

	@GetMapping("/list")
	public void list() {
		log.info("list : access to all");
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/register")
	public void registerForm() {
		log.info("registerForm : access to admin");
	}
	
}
