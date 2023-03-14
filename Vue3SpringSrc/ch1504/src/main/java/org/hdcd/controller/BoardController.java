package org.hdcd.controller;

import org.hdcd.domain.Board;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {

	@PostMapping
	public ResponseEntity<String> register(@RequestBody Board board) {
		log.info("register");
		
		log.info("Title : " + board.getTitle());
		log.info("Content : " + board.getContent());
		log.info("Writer : " + board.getWriter());
		
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
	
}
