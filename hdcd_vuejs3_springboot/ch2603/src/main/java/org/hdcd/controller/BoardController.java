package org.hdcd.controller;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.domain.BoardModel;
import org.hdcd.domain.BoardModelAssembler;
import org.hdcd.repository.BoardRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RepositoryRestController
public class BoardController {

	private final BoardRepository boardRepository;
	
	@GetMapping("/boards")
	public ResponseEntity<CollectionModel<BoardModel>> list() throws Exception {
		log.info("list");
		
		List<Board> boards = boardRepository.findAll();
		
		for(Board board : boards) {
			log.info("" + board);
		}
		
		CollectionModel<BoardModel> boardModels = new BoardModelAssembler().toCollectionModel(boards);
		
		return new ResponseEntity<>(boardModels, HttpStatus.OK);
	}
	
	@PutMapping("/boards/{boardNo}")
	public ResponseEntity<Board> modify(@PathVariable("boardNo") long boardNo, @Validated @RequestBody Board board) throws Exception {
		log.info("modify");
		
		board.setBoardNo(boardNo);
		
		Board boardEntity = boardRepository.getOne(board.getBoardNo());
		
		log.info("boardEntity " + boardEntity);

		boardEntity.setTitle(board.getTitle());
		boardEntity.setContent(board.getContent());
		
		boardRepository.save(boardEntity);

		return new ResponseEntity<>(board, HttpStatus.OK);
	}
	
}
