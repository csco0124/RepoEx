package org.hdcd.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.ToString;

@ToString
@Builder
public class Board {

	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
}
