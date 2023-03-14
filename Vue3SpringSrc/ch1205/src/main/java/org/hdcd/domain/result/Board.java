package org.hdcd.domain.result;

import java.time.LocalDateTime;

public class Board {

	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
	@Override
	public String toString() {
		return "Board(boardNo=" + boardNo + ", title=" + title + ", content=" + content + ", writer=" + writer + ", regDate=" + regDate + ")";
	}
	
}
