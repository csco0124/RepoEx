package com.narui.democlientb.test.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.narui.democlientb.test.dao.TestDao;
import com.narui.democlientb.test.dto.TestDto;

@Service
public class TestService {
	
	@Autowired
	public TestDao testDao;
	
	public TestDto getCurdate() {
		return testDao.getCurdate();
	}

	public void insertTest() {
		TestDto testDto = new TestDto();
		testDto.setId("ID_1");
		testDto.setUserName("USERNAME_1");
		int resultCnt = testDao.insertTest(testDto);
		System.out.println("INSERT 성공 : " + resultCnt);
		
		//int err = 1/0;	// AOP 트랜잭션 테스트 위한 강제 에러
	}
	
	public int insertTestData(TestDto testDto) {
		return testDao.insertTest(testDto);
	}
	
	public int updateTestUserName(TestDto testDto) {
		return testDao.updateTestUserName(testDto);
	}
	
	public int deleteTestId(TestDto testDto) {
		return testDao.deleteTestId(testDto);
	}
	
	public List<Map<String, Object>> getDbTestData(TestDto testDto) {
		return testDao.getDbTestData(testDto);
	}
	
}
