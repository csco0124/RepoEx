package org.hdcd.repository;

import java.util.List;

import org.hdcd.domain.Board;

public interface CustomBoardRepository {

	public List<Board> listAll();
	
	public List<Board> searchByTitle(String title);
	
	public List<Board> searchByWriter(String writer);
	
	public List<Board> searchByContent(String content);
	
	public List<Board> searchByTitleOrContent(String title, String content);
	
	public List<Board> searchByContentOrWriter(String content, String writer);
	
	public List<Board> searchByTitleOrContentOrWriter(String title, String content, String writer);
	
}
