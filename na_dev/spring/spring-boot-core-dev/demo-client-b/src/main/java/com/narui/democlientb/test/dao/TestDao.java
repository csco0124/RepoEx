package com.narui.democlientb.test.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.narui.democlientb.test.dto.TestDto;

@Mapper
public interface TestDao {
	public TestDto getCurdate();
	
	public int insertTest(TestDto testDto);
	
	public int updateTestUserName(TestDto testDto);

	public int deleteTestId(TestDto testDto);
		
	public List<Map<String, Object>> getDbTestData(TestDto testDto);
}
