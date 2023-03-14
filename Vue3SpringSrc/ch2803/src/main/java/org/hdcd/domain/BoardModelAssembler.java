package org.hdcd.domain;

import org.hdcd.controller.BoardController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;

public class BoardModelAssembler extends RepresentationModelAssemblerSupport<Board, BoardModel> {

	public BoardModelAssembler() {
		super(BoardController.class, BoardModel.class);
	}

	@Override
	public BoardModel toModel(Board board) {
		BoardModel resource = new BoardModel(board);
		return resource;
	}

}
