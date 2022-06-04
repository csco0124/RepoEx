package org.hdcd.repository;

import java.util.List;

import org.hdcd.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long>{

	public List<Board> findByBoardNoGreaterThanOrderByBoardNoDesc(Long boardNo);
	
	public List<Board> findByTitleContainingOrderByBoardNoDesc(String title);
	
	public List<Board> findByWriterContainingOrderByBoardNoDesc(String writer);
	
	public List<Board> findByContentContainingOrderByBoardNoDesc(String content);
	
	public List<Board> findByTitleContainingOrContentContainingOrderByBoardNoDesc(String title, String content);
	
	public List<Board> findByContentContainingOrWriterContainingOrderByBoardNoDesc(String content, String writer);
	
	public List<Board> findByTitleContainingOrContentContainingOrWriterContainingOrderByBoardNoDesc(String title, String content, String writer);
	
}
