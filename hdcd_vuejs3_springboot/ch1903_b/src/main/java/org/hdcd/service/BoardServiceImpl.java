package org.hdcd.service;

import java.util.List;

import org.hdcd.dao.BoardDAO;
import org.hdcd.domain.Board;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService {

	private final BoardDAO dao;

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
