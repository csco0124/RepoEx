package com.narui.test.service;

import java.util.Locale;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.narui.test.dao.TestDao;
import com.narui.test.dto.TestDto;

@SpringBootTest
@TestPropertySource(locations="classpath:application.properties")
@Transactional
public class TestServiceTest {
	
	@Autowired
    private MessageSourceAccessor messageSourceAccessor;
	
	@Autowired
	public TestDao testDao;
	
	@Test
	@DisplayName("Message 프로퍼티 테스트")
    public void testMessage() throws Exception {
    	System.out.println("en : " + messageSourceAccessor.getMessage("common.hello", Locale.ENGLISH));
        System.out.println("ko : " + messageSourceAccessor.getMessage("common.hello"));
    }
	
	@Test
    @DisplayName("TEST DB 저장 테스트")
    public void insertTestDbTest(){
		TestDto testDto = new TestDto();
		testDto.setId("ID_1");
		testDto.setUserName("USERNAME_1");
		int resultCnt = testDao.insertTest(testDto);
		System.out.println("INSERT 성공 : " + resultCnt);
		
    }
}
