package org.hdcd;

import org.hdcd.domain.Board;
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
	public void testGetterSetter() {
		Board board = new Board(1);
		board.setTitle("게시판제목");
		
		System.out.println(board.getTitle());
	}
	
	@Test
	public void testToString() {
		Board board = new Board(1);
		
		System.out.println(board);
	}
	
}
