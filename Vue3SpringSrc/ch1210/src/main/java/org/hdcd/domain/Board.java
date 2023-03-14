package org.hdcd.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Board {

	private final int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
}
