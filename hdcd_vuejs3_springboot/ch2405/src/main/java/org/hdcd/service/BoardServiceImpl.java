package org.hdcd.service;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.domain.QBoard;
import org.hdcd.repository.BoardRepository;
import org.hdcd.vo.PageRequestVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.BooleanBuilder;

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
	public Board read(Long boardNo) throws Exception {
		return repository.getOne(boardNo);
	}

	@Override
	@Transactional
	public void modify(Board board) throws Exception {
		Board boardEntity = repository.getOne(board.getBoardNo());

		boardEntity.setTitle(board.getTitle());
	}

	@Override
	@Transactional
	public void remove(Long boardNo) throws Exception {
		repository.deleteById(boardNo);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Board> list(PageRequestVO pageRequestVO) throws Exception {
		String searchType = pageRequestVO.getSearchType();
		String keyword = pageRequestVO.getKeyword();
		
		List<Board> list = null;
		if(searchType != null && searchType.length() > 0) {
			if(searchType.equals("t")) {
				list = searchByTitle(keyword);
			}
			else if(searchType.equals("w")) {
				list = searchByWriter(keyword);
			}
			else if(searchType.equals("c")) {
				list = searchByContent(keyword);
			}
			else if(searchType.equals("tc")) {
				list = searchByTitleOrContent(keyword, keyword);
			}
			else if(searchType.equals("cw")) {
				list = searchByContentOrWriter(keyword, keyword);
			}
			else if(searchType.equals("tcw")) {
				list = searchByTitleOrContentOrWriter(keyword, keyword, keyword);
			}			
			else {
				list = listAll();
			}
		}
		else {
			list = listAll();
		}
		
		return list;
	}

	private List<Board> listAll() {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.boardNo.gt(0));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByTitle(String title) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.title.like("%" + title +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByWriter(String writer) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.writer.like("%" + writer +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByContent(String content) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.content.like("%" + content +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByTitleOrContent(String title, String content) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.title.like("%" + title +"%"))
		.or(board.content.like("%" + content +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByContentOrWriter(String content, String writer) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.content.like("%" + content +"%"))
		.or(board.writer.like("%" + writer +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
	private List<Board> searchByTitleOrContentOrWriter(String title, String content, String writer) {
		QBoard board = QBoard.board;
		
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(board.title.like("%" + title +"%"))
		.or(board.content.like("%" + content +"%"))
		.or(board.writer.like("%" + writer +"%"));
		
		List<Board> list = new ArrayList<Board>();
		
		repository.findAll(builder).forEach(b -> list.add(b));
		
		return list;
	}
	
}
