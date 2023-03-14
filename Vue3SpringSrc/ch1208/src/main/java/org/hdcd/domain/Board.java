package org.hdcd.domain;

import java.time.LocalDateTime;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@ToString
public class Board {

	@NonNull
	private Integer boardNo;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime regDate;
	
}
