package org.hdcd.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class Board {

	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
}
