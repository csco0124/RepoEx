package org.hdcd.controller;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.repository.BoardRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RepositoryRestController
public class BoardController {

	private final BoardRepository boardRepository;
	
	@GetMapping("/boards")
	public ResponseEntity<CollectionModel<EntityModel<Board>>> list() throws Exception {
		log.info("list");
		
		List<Board> boards = boardRepository.findAll();
		
		for(Board board : boards) {
			log.info("" + board);
		}
		
		CollectionModel<EntityModel<Board>> boardModels = CollectionModel.wrap(boards);
		
		for(EntityModel<Board> entityModel : boardModels) {
			log.info("" + entityModel);
		}
		
		return new ResponseEntity<>(boardModels, HttpStatus.OK);
	}
	
}
