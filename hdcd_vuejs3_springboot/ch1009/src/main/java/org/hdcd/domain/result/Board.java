package org.hdcd.domain.result;

import java.time.LocalDateTime;

import lombok.ToString;

@ToString
public class Board {

	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
	public Board(int boardNo, String title, String content, String writer, LocalDateTime regDate) {
		super();
		this.boardNo = boardNo;
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.regDate = regDate;
	}
	
}
