package org.hdcd;

import org.hdcd.domain.Board;
import org.hdcd.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LombokTests {

	@Test
	public void testToString() {
		Board board = new Board();
		
		System.out.println(board);
	}
	
	@Test
	public void testToStringExclude() {
		Member member = new Member();
		
		System.out.println(member);
	}
	
}
