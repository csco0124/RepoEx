package org.hdcd.domain;

import java.time.LocalDateTime;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Getter
public class BoardModel extends RepresentationModel<BoardModel> {

	private long boardNo;
	
	private final String title;
	private final String content;
	private final String writer;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private final LocalDateTime regDate;

	public BoardModel(Board board) {
		this.boardNo = board.getBoardNo();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.writer = board.getWriter();
		this.regDate = board.getRegDate();
	}
	
}
