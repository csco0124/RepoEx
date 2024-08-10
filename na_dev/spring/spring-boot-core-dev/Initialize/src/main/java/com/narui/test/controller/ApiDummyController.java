package com.narui.test.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narui.test.dto.DummyDataDto;
import com.narui.test.service.DummyDataService;
import com.narui.test.util.CommonUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/dummy")
public class ApiDummyController {
	@Autowired
	public DummyDataService dummyDataService;
	
	@Autowired
	public CommonUtils commonUtils;
	
	@RequestMapping("/getDataList")
	public Map<String, Object> getDataList(HttpServletRequest request) throws Exception {
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> resultMap = new HashMap<>();
		int searchType = (int) commonUtils.nvl(request.getParameter("searchType"), 0);
		String searchStr = commonUtils.nvl(request.getParameter("searchStr"), "");
		int pageNum = (int) commonUtils.nvl(request.getParameter("pageNum"), 1);
		
		int rowCnt = (int) commonUtils.nvl(request.getParameter("rowCnt"), 1);
		int startRow = (pageNum - 1) * rowCnt;
		
		map.put("searchType", searchType);
		map.put("searchStr", searchStr);
		map.put("rowCnt", rowCnt);
		map.put("startRow", startRow);
		List<Map<String, String>> list = dummyDataService.selectJsonData(map);
		
		resultMap.put("dataList", list);
		
		Map<String, Object> totalMap = dummyDataService.chkTotalPage(map);
		resultMap.put("totalPage", totalMap.get("totalPage"));
		resultMap.put("totalCnt", totalMap.get("totalCnt"));
		
		
		return resultMap;
    }
	
	@RequestMapping("/setData")
	public String setDummyData(@RequestBody DummyDataDto dto) throws Exception {
		int chk = dummyDataService.chkData(dto);
		log.info("조회건수 >>>"+chk);
		if(chk == 0) {
			dummyDataService.insertJsonData(dto);
			log.info("등록완료");
			return "등록완료";
		}else {
			log.info("동일한 경로의 "+chk+"건이 존재해 등록실패");
			return "동일한 경로의 "+chk+"건이 존재해 등록실패";
		}
	}
	
	@RequestMapping("/updateData")
	@PostMapping
	public String updateData(@RequestBody DummyDataDto dto) throws Exception {
		int cnt = dummyDataService.updateJsonData(dto);
		
		String reuslt = "";
		if(cnt > 0) {
			reuslt = "수정완료";
		}else {
			reuslt = "수정실패";
		}
		log.info(reuslt);
		return reuslt;
	}
	
	@RequestMapping("/deleteData")
	@PostMapping
	public String deleteData(@RequestBody JsonNode jsonNode) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		List<DummyDataDto> list = new ArrayList<>();
		
		if (jsonNode.isArray()) {
			list = objectMapper.convertValue(jsonNode, new TypeReference<List<DummyDataDto>>() {});
		}else {
			DummyDataDto dto = objectMapper.convertValue(jsonNode, DummyDataDto.class);
			list.add(dto);
		}
		log.info("받은 json 값 >>> "+list.toString());
		
		int result = dummyDataService.deleteJsonData(list);
		log.info(result + "건 삭제완료");
		return "삭제완료";
	}
}
