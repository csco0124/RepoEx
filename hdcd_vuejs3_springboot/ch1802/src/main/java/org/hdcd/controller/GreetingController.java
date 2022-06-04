package org.hdcd.controller;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/greetings")
public class GreetingController {

	private final MessageSource messageSource;

	@GetMapping(path = "/welcome", produces="text/plain;charset=UTF-8")
	public ResponseEntity<String> welcome() {
		String message = messageSource.getMessage("welcome.message", null, Locale.KOREAN);
		
		log.info("Welcome message : " + message);
		
		return new ResponseEntity<String>(message, HttpStatus.OK);
	}

}
