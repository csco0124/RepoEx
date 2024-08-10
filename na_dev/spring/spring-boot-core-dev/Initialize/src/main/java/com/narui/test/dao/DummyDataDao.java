package com.narui.test.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.narui.test.dto.DummyDataDto;

@Mapper
public interface DummyDataDao {
	public List<Map<String, String>> selectJsonData(Map<String, Object> map);
	public Map<String, Object> chkTotalPage(Map<String, Object> map);
	public int chkData(DummyDataDto dto);
	public int insertJsonData(DummyDataDto dto);
	public int updateJsonData(DummyDataDto dto);
	public int deleteJsonData(List<DummyDataDto> list);
}
