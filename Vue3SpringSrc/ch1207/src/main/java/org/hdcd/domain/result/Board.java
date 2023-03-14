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
	
}
