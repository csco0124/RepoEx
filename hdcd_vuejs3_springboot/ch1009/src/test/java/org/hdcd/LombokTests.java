package org.hdcd;

import java.time.LocalDateTime;

import org.hdcd.domain.Board;
import org.hdcd.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LombokTests {

	@Test
	public void testAllArgsConstructor() {
		Board board = new Board(1, "title1", "content1", "writer1", LocalDateTime.now());
		
		System.out.println(board);
	}
	
	@Test
	public void testAllArgsConstructor2() {
		Member member = new Member("userId1", "password1", "userName1");
		
		System.out.println(member);
	}
	
}
