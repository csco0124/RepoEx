package org.hdcd.service;

import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.repository.BoardRepository;
import org.hdcd.vo.PageRequestVO;
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
				list = repository.searchByTitle(keyword);
			}
			else if(searchType.equals("w")) {
				list = repository.searchByWriter(keyword);
			}
			else if(searchType.equals("c")) {
				list = repository.searchByContent(keyword);
			}
			else if(searchType.equals("tc")) {
				list = repository.searchByTitleOrContent(keyword, keyword);
			}
			else if(searchType.equals("cw")) {
				list = repository.searchByContentOrWriter(keyword, keyword);
			}
			else if(searchType.equals("tcw")) {
				list = repository.searchByTitleOrContentOrWriter(keyword, keyword, keyword);
			}			
			else {
				list = repository.listAll();
			}
		}
		else {
			list = repository.listAll();
		}
		
		return list;
	}
	
}
