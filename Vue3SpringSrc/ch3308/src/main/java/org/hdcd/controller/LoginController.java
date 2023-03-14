package org.hdcd.controller;

import org.hdcd.common.security.domain.CustomUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {
	
	@GetMapping("/myinfo")
	public ResponseEntity<String> getMyInfo(@AuthenticationPrincipal CustomUser customUser) throws Exception {		
		String username = customUser.getUsername();
		log.info("getMyInfo username = " + username);
		
		return new ResponseEntity<>(username, HttpStatus.OK);
	}
	
}
