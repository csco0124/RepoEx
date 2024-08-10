package com.narui.democlientb.test.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import com.narui.democlientb.test.service.DummyDataService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/dummy")
public class DummyDataController {
	@Autowired
	public DummyDataService dummyDataService;
		
	@RequestMapping("/**")
	public ResponseEntity<String> getDummyData(HttpServletRequest request) throws Exception{
		String fullPath = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		String dataPath = fullPath.substring("/dummy".length());
		String methodType = request.getMethod();
		
		log.info("!!! 입력된 데이터 dataPath >>> "+dataPath);
		log.info("!!! methodType >>> "+methodType);
		
		Map<String, Object> map = new HashMap<>();
		map.put("dataPath", dataPath);
		map.put("methodType", methodType);
		List<Map<String, String>> list = dummyDataService.selectJsonData(map);
		
		if(list.size() > 0) {
			
			Map<String, String> resultMap = list.get(0);
			int delayTime = Integer.parseInt(resultMap.get("delayTime"));
			Thread.sleep(1000*delayTime);
			
			int statusCode = Integer.parseInt(resultMap.get("statusCode"));
			
			return ResponseEntity.status(statusCode).body(resultMap.get("jsonData"));
		}else {
			return ResponseEntity.status(404).body("잘못된 경로");
		}
	}
	
}
