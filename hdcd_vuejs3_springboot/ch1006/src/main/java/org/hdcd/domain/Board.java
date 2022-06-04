package org.hdcd.domain;

import java.time.LocalDateTime;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode(of="boardNo")
public class Board {

	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
}
