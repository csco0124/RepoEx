package com.narui.democlientb.test.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.narui.democlientb.test.dao.DummyDataDao;
import com.narui.democlientb.test.dto.DummyDataDto;

@Service
public class DummyDataService {
	
	@Autowired
	private DummyDataDao dummyDataDao;

	public List<Map<String, String>> selectJsonData(Map<String, Object> map) {
		return dummyDataDao.selectJsonData(map);
	}
	
	public Map<String, Object> chkTotalPage(Map<String, Object> map) {
		return dummyDataDao.chkTotalPage(map);
	}
	
	public int chkData(DummyDataDto dto) {
		return dummyDataDao.chkData(dto);
	}
	public int insertJsonData(DummyDataDto dto) {
		return dummyDataDao.insertJsonData(dto);
	}
	public int updateJsonData(DummyDataDto dto) {
		return dummyDataDao.updateJsonData(dto);
	}
	public int deleteJsonData(List<DummyDataDto> list) {
		return dummyDataDao.deleteJsonData( list);
	}
	
}
