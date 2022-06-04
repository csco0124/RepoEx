package org.hdcd;

import org.hdcd.domain.Board;
import org.hdcd.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LombokTests {

	@Test
	public void testRequiredArgsConstructor() {
		Board board = new Board(1);
		
		System.out.println(board);
	}
	
	@Test
	public void testRequiredArgsConstructor2() {
		Member member = new Member("userId1", "password1");
		
		System.out.println(member);
	}
	
}
