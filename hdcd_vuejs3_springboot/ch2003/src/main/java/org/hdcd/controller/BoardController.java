package org.hdcd.controller;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

	private final BoardService service;

	@GetMapping("/{boardNo}")
	public ResponseEntity<Board> read(@PathVariable("boardNo") long boardNo) {
		log.info("read");
		
		ResponseEntity<Board> entity = null;
		try {
			Board board = service.read(boardNo);
			
			entity = new ResponseEntity<>(board, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}

	@GetMapping
	public ResponseEntity<List<Board>> list() {
		log.info("list");
		
		ResponseEntity<List<Board>> entity = null;
		try {
			entity = new ResponseEntity<>(service.list(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}

	@PostMapping
	public ResponseEntity<String> register(@Validated @RequestBody Board board) {
		log.info("register");
		
		ResponseEntity<String> entity = null;
		try {
			service.register(board);
			
			entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}

	@DeleteMapping("/{boardNo}")
	public ResponseEntity<String> remove(@PathVariable("boardNo") long boardNo) {
		log.info("remove");
		
		ResponseEntity<String> entity = null;
		try {
			service.remove(boardNo);
			
			entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}

	@PutMapping("/{boardNo}")
	public ResponseEntity<String> modify(@PathVariable("boardNo") long boardNo, @Validated @RequestBody Board board) {
		log.info("modify");
		
		ResponseEntity<String> entity = null;
		try {
			board.setBoardNo(boardNo);
			service.modify(board);

			entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}

}
