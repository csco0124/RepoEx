package org.hdcd.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/board")
@Controller
public class BoardController {

	@GetMapping("/list")
	public void list() {
		log.info("list : access to all");
	}

	@PreAuthorize("hasRole('MEMBER')")
	@GetMapping("/register")
	public void registerForm() {
		log.info("registerForm : access to member");
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/read")
	public void read() {
		log.info("read : access to authenticated user");
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MEMBER')")
	@GetMapping("/modify")
	public void modifyForm() {
		log.info("modifyForm : access to member or admin");
	}

}
