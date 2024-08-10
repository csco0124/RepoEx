package com.narui.test.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.narui.test.dao.MbyBoardDao;
import com.narui.test.dto.MbyBoardDto;

@Service
public class MbyBoardService {

	private final MbyBoardDao mbyDao;

	public MbyBoardService(MbyBoardDao mbyDao) {
		this.mbyDao = mbyDao;
	}

	// 게시글 불러오기
	public List<MbyBoardDto> getData() {
		List<MbyBoardDto> titleList = mbyDao.getData();
		return titleList;
	}

	// 게시글 글쓰기
	public int insertData(MbyBoardDto mbyDto) {
		return mbyDao.insertData(mbyDto);
	}

}
