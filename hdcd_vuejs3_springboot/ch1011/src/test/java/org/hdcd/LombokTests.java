package org.hdcd;

import java.time.LocalDateTime;

import org.hdcd.domain.Board;
import org.hdcd.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LombokTests {

	@Test
	public void testBoardBuilder() {
		Board board = Board.builder()
				.boardNo(1)
				.title("title1")
				.content("content1")
				.writer("writer1")
				.regDate(LocalDateTime.now())
				.build();
		
		System.out.println(board);
	}
	
	@Test
	public void testMemberBuilder() {
		Member member = Member.builder()
				.userId("userId1")
				.password("password1")
				.build();
		
		System.out.println(member);
	}
	
}
