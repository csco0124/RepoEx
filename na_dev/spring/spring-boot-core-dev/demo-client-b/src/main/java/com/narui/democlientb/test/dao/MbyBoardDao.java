package com.narui.democlientb.test.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.narui.democlientb.test.dto.MbyBoardDto;

@Mapper
public interface MbyBoardDao {

	public List<MbyBoardDto> getData(); // 게시글 불러오기

	public int insertData(MbyBoardDto mbyDto); // 게시글 글쓰기

}
