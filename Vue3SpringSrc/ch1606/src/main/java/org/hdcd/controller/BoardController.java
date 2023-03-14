package org.hdcd.controller;

import java.time.LocalDateTime;

import org.hdcd.domain.Board;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {

	@GetMapping("/{boardNo}")
	public ResponseEntity<Board> read(@PathVariable("boardNo") int boardNo) {
		log.info("read");

		Board board = new Board();
		
		board.setTitle("제목");
		board.setContent("내용입니다.");
		board.setWriter("홍길동");
		board.setRegDate(LocalDateTime.now());

		ResponseEntity<Board> entity = new ResponseEntity<Board>(board, HttpStatus.OK);

		return entity;
	}

	@GetMapping(path = "/{boardNo}", produces = "application/json")
	public ResponseEntity<Board> readToJson(@PathVariable("boardNo") int boardNo) {
		log.info("readToJson");

		Board board = new Board();

		board.setTitle("제목");
		board.setContent("내용입니다.");
		board.setWriter("홍길동");
		board.setRegDate(LocalDateTime.now());

		ResponseEntity<Board> entity = new ResponseEntity<Board>(board, HttpStatus.OK);

		return entity;
	}

	@GetMapping(path = "/{boardNo}", produces = "application/xml")
	public ResponseEntity<Board> readToXml(@PathVariable("boardNo") int boardNo) {
		log.info("readToXml");

		Board board = new Board();

		board.setTitle("제목");
		board.setContent("내용입니다.");
		board.setWriter("홍길동");
		board.setRegDate(LocalDateTime.now());

		ResponseEntity<Board> entity = new ResponseEntity<Board>(board, HttpStatus.OK);

		return entity;
	}

}
