package org.hdcd.controller;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Board;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards")
public class BoardController {

	@GetMapping
	public ResponseEntity<List<Board>> list() {
		log.info("list");

		List<Board> boardList = new ArrayList<>();

		boardList.add(new Board());

		ResponseEntity<List<Board>> entity = new ResponseEntity<>(boardList, HttpStatus.OK);

		return entity;
	}

	@PostMapping
	public ResponseEntity<String> register(@RequestBody Board board) {
		log.info("register");

		ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
	@GetMapping("/{boardNo}")
	public ResponseEntity<Board> read(@PathVariable("boardNo") int boardNo) {
		log.info("read");

		Board board = new Board();

		ResponseEntity<Board> entity = new ResponseEntity<>(board, HttpStatus.OK);

		return entity;
	}

	@DeleteMapping("/{boardNo}")
	public ResponseEntity<String> remove(@PathVariable("boardNo") int boardNo) {
		log.info("remove");

		ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

		return entity;
	}

	@PutMapping("/{boardNo}")
	public ResponseEntity<String> modifyByPut(@PathVariable("boardNo") int boardNo, @RequestBody Board board) {
		log.info("modifyByPut");

		ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

		return entity;
	}

	@PatchMapping("/{boardNo}")
	public ResponseEntity<String> modifyByPatch(@PathVariable("boardNo") int boardNo, @RequestBody Board board) {
		log.info("modifyByPatch");

		ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

		return entity;
	}
	
}
