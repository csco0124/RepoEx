package org.hdcd.service;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.repository.BoardRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService {

	private final BoardRepository repository;

	@Override
	@Transactional
	public void register(Board board) throws Exception {
		repository.save(board);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Board> list() throws Exception {
		return repository.findAll(Sort.by(Direction.DESC, "boardNo"));
	}

	@Override
	@Transactional(readOnly = true)
	public Board read(long boardNo) throws Exception {
		return repository.getOne(boardNo);
	}

	@Override
	@Transactional
	public void modify(Board board) throws Exception {
		Board boardEntity = repository.getOne(board.getBoardNo());

		boardEntity.setTitle(board.getTitle());
		boardEntity.setContent(board.getContent());
	}

	@Override
	@Transactional
	public void remove(long boardNo) throws Exception {
		repository.deleteById(boardNo);
	}

}
