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
	
	Board(int boardNo, String title, String content, String writer, LocalDateTime regDate) {
		super();
		this.boardNo = boardNo;
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.regDate = regDate;
	}	
	
	public static BoardBuilder builder() {
		return new BoardBuilder();
	}
	
	public static class BoardBuilder {
		
		private int boardNo;
		private String title;
		private String content;
		private String writer;
		private LocalDateTime regDate;
		
		private BoardBuilder() {}
		
		public BoardBuilder boardNo(int boardNo) {
			this.boardNo = boardNo;
			return this;
		}
		
		public BoardBuilder title(String title) {
			this.title = title;
			return this;
		}
		
		public BoardBuilder content(String content) {
			this.content = content;
			return this;
		}
		
		public BoardBuilder writer(String writer) {
			this.writer = writer;
			return this;
		}
		
		public BoardBuilder regDate(LocalDateTime regDate) {
			this.regDate = regDate;
			return this;
		}
		
		public Board build() {
			return new Board(boardNo, title, content, writer, regDate);
		}

	}
	
}
