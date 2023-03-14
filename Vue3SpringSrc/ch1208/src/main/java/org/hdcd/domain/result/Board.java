package org.hdcd.domain.result;

import java.time.LocalDateTime;

import lombok.ToString;

@ToString
public class Board {

	private Integer boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
	public Board(int boardNo) {
		super();
		this.boardNo = boardNo;
	}
	
}
