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
		
		board.setBoardNo(10);
		board.setTitle("Board Title");
		board.setContent("Board Content");
		board.setWriter("Board Writer");
		board.setRegDate(LocalDateTime.now());

		return new ResponseEntity<Board>(board, HttpStatus.OK);
	}

}
