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
	
	@PostMapping
	public ResponseEntity<Board> register(@Validated @RequestBody Board board) throws Exception {
		log.info("register");
		
		service.register(board);
		
		log.info("register board.getBoardNo() = " + board.getBoardNo());
		
		return new ResponseEntity<>(board, HttpStatus.OK);
	}	

	@GetMapping
	public ResponseEntity<List<Board>> list() throws Exception {
		log.info("list");
		
		return new ResponseEntity<>(service.list(), HttpStatus.OK);
	}	

	@GetMapping("/{boardNo}")
	public ResponseEntity<Board> read(@PathVariable("boardNo") long boardNo) throws Exception {
		log.info("read");
		
		Board board = service.read(boardNo);
			
		return new ResponseEntity<>(board, HttpStatus.OK);
	}

	@PutMapping("/{boardNo}")
	public ResponseEntity<Board> modify(@PathVariable("boardNo") long boardNo, @Validated @RequestBody Board board) throws Exception {
		log.info("modify");
		
		board.setBoardNo(boardNo);
		service.modify(board);
		
		return new ResponseEntity<>(board, HttpStatus.OK);
	}	

	@DeleteMapping("/{boardNo}")
	public ResponseEntity<Void> remove(@PathVariable("boardNo") long boardNo) throws Exception {
		log.info("remove");
		
		service.remove(boardNo);

		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
