package org.hdcd.service;

import java.util.List;

import org.hdcd.dao.BoardDAO;
import org.hdcd.domain.Board;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

	private BoardDAO dao;

	public BoardServiceImpl(BoardDAO dao) {
		this.dao = dao;
	}

	@Override
	public void register(Board board) throws Exception {
		dao.create(board);
	}

	@Override
	public Board read(Integer boardNo) throws Exception {
		return dao.read(boardNo);
	}

	@Override
	public void modify(Board board) throws Exception {
		dao.update(board);
	}

	@Override
	public void remove(Integer boardNo) throws Exception {
		dao.delete(boardNo);
	}

	@Override
	public List<Board> list() throws Exception {
		return dao.list();
	}
	
}
