package org.hdcd.mapper;

import java.util.List;

import org.hdcd.domain.Board;

public interface BoardMapper {

	public void create(Board board) throws Exception;

	public List<Board> list() throws Exception;

	public Board read(long boardNo) throws Exception;

	public void update(Board board) throws Exception;

	public void delete(long boardNo) throws Exception;
	
}
