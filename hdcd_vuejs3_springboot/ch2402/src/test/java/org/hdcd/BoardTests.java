package org.hdcd;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.dto.PaginationDTO;
import org.hdcd.repository.BoardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@SpringBootTest
public class BoardTests {

	@Autowired
	BoardRepository boardRepository;
	
	@Test
	public void insertDummyData53() {
		
		for(int i = 0; i < 53; i++) {
			int boardNo = i + 1;
			Board board = new Board();
			board.setTitle("title_" + boardNo);
			board.setWriter("writer_" + boardNo);
			board.setContent("content_" + boardNo);
			
			boardRepository.save(board);
		}

	}

	@Test
	public void insertDummyData100() {
		
		for(int i = 0; i < 100; i++) {
			int boardNo = i + 1;
			Board board = new Board();
			board.setTitle("title_" + boardNo);
			board.setWriter("writer_" + boardNo);
			board.setContent("content_" + boardNo);
			
			boardRepository.save(board);
		}

	}
	
	@Test
	public void insertDummyData275() {
		
		for(int i = 0; i < 275; i++) {
			int boardNo = i + 1;
			Board board = new Board();
			board.setTitle("title_" + boardNo);
			board.setWriter("writer_" + boardNo);
			board.setContent("content_" + boardNo);
			
			boardRepository.save(board);
		}

	}

	@Test
	public void testFindAllByPage() {
		Pageable pageRequest = PageRequest.of(0, 10, Sort.Direction.DESC, "boardNo");
		
		Page<Board> page = boardRepository.findAll(pageRequest);
		
		int totalPages = page.getTotalPages();
		
		System.out.println(page);
		System.out.println("totalPages : " + totalPages);
		
		Pageable pageable = page.getPageable();
		
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		
		System.out.println(pageable);
		System.out.println("pageNumber : " + pageNumber);
		System.out.println("pageSize : " + pageSize);
		
		List<Board> boardList = page.getContent();
		
		for(Board board : boardList) {
			System.out.println(board);
		}
	}
	
	@Test
	public void testPreviousPageable() {
		int currentPageNumber = 3;
		
		Pageable pageRequest = PageRequest.of(currentPageNumber, 10, Sort.Direction.DESC, "boardNo");
		
		Page<Board> currentPage = boardRepository.findAll(pageRequest);
		
		int totalPages = currentPage.getTotalPages();
	
		System.out.println(currentPage);
		System.out.println("totalPages : " + totalPages);
		
		Pageable currentPageable = currentPage.getPageable();
		
		int pageNumber = currentPageable.getPageNumber();
		int pageSize = currentPageable.getPageSize();
		
		System.out.println(currentPageable);
		System.out.println("pageNumber : " + pageNumber);
		System.out.println("pageSize : " + pageSize);
		
		List<Board> boardList = currentPage.getContent();
		
		for(Board board : boardList) {
			System.out.println(board);
		}
		
		int startPageNumber = 0;
		Pageable startPageable = currentPageable;
		//
		//Pageable previousPageable = currentPageable.previousOrFirst();
		//Pageable nextPageable = pageable.next();
				
		for(int i = currentPageNumber - 1; i >= startPageNumber; i--){
			startPageable = startPageable.previousOrFirst();
			
			System.out.println("previousPageNumber : " + startPageable.getPageNumber());
			System.out.println("previousPageSize : " + startPageable.getPageSize());
		}
	}

	@Test
	public void testNextPageable() {
		int currentPageNumber = 3;
		
		Pageable pageRequest = PageRequest.of(currentPageNumber, 10, Sort.Direction.DESC, "boardNo");
		
		Page<Board> currentPage = boardRepository.findAll(pageRequest);
		
		int totalPages = currentPage.getTotalPages();
	
		System.out.println(currentPage);
		System.out.println("totalPages : " + totalPages);
		
		Pageable currentPageable = currentPage.getPageable();
		
		int pageNumber = currentPageable.getPageNumber();
		int pageSize = currentPageable.getPageSize();
		
		System.out.println(currentPageable);
		System.out.println("pageNumber : " + pageNumber);
		System.out.println("pageSize : " + pageSize);
		
		List<Board> boardList = currentPage.getContent();
		
		for(Board board : boardList) {
			System.out.println(board);
		}
		
		int endPageNumber = 10;
		for(int i = currentPageNumber; i <= endPageNumber; i++){
			currentPageable = currentPageable.next();
			
			System.out.println("nextPageNumber : " + currentPageable.getPageNumber());
			System.out.println("nextPageSize : " + currentPageable.getPageSize());
		}
		
	}

	@Test
	public void testPageMaker() {
		int currentPageNumber = 3;
		
		Pageable pageRequest = PageRequest.of(currentPageNumber, 10, Sort.Direction.DESC, "boardNo");
		
		Page<Board> currentPage = boardRepository.findAll(pageRequest);
		
		int totalPages = currentPage.getTotalPages();
	
		System.out.println(currentPage);
		System.out.println("totalPages : " + totalPages);
		
		PaginationDTO<Board> pageMaker = new PaginationDTO<Board>(currentPage);
		
		System.out.println("totalPageCount : " + pageMaker.getTotalPageCount());
		
	}
	
}
