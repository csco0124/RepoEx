package com.narui.test.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.test.dto.TestDto;
import com.narui.test.service.TestService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/test")
public class ApiController {
	
	@Autowired
	public TestService testService;
	
	@RequestMapping("/get_test_json_data")
	public List<Map<String, Object>> getTestJsonData() throws Exception {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(int i=0; i<10; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("USER", "User_" + i);
			map.put("ADDRESS", "Address_" + i);
			list.add(map);
		}
        return list;
    }
	@RequestMapping("/get_test_json_data_sleep")
	public List<Map<String, Object>> getTestJsonDataSleep() throws Exception {
        Thread.sleep(1000);
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(int i=0; i<10; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("USER", "User_" + i);
			map.put("ADDRESS", "Address_" + i);
			list.add(map);
		}
        return list;
    }
	@RequestMapping("/get_test_json_random_data_sleep")
	public List<Map<String, Object>> getTestJsonRandomDataSleep() throws Exception {
        Thread.sleep(500);
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(int i=0; i<5; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("NUMBER", System.currentTimeMillis());
			map.put("UID", UUID.randomUUID());
			list.add(map);
		}
        return list;
    }
	@RequestMapping("/get_test_json_data_param")
	public List<Map<String, Object>> getTestJsonDataParam(@RequestBody Map<String, Object> reqMap) throws Exception {
        int repeatCnt = Integer.parseInt(""+reqMap.get("repeatCnt"));
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(int i=0; i<repeatCnt; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("USER", "User_" + i);
			map.put("ADDRESS", "Address_" + i);
			list.add(map);
		}
        return list;
    }
	
	@RequestMapping("/insertTestData")
	public String insertTestData(@RequestBody TestDto testDto) throws Exception {
		try {
			testService.insertTestData(testDto);
			return "Y";
		} catch(Exception e) {
			e.printStackTrace();
			return "E";
		}
    }
	
	@RequestMapping("/updateTestUserName")
	public String updateTestUserName(@RequestBody TestDto testDto) throws Exception {
		try {
			testService.updateTestUserName(testDto);
			return "Y";
		} catch(Exception e) {
			e.printStackTrace();
			return "E";
		}
    }
	
	@RequestMapping("/deleteTestId")
	public String deleteTestId(@RequestBody TestDto testDto) throws Exception {
		try {
			testService.deleteTestId(testDto);
			return "Y";
		} catch(Exception e) {
			e.printStackTrace();
			return "E";
		}
    }
	
	
	
	@RequestMapping("/get_chartjs_data")
	public Map<String, Object> getChartjsData() throws Exception {
        
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 0~10사이 난수
		int dataset1Num = (int)((Math.random()*10000)%10);
		int dataset2Num = (int)((Math.random()*10000)%10);
		
		resultMap.put("dataset1", dataset1Num);
		resultMap.put("dataset2", dataset2Num);
		
        return resultMap;
    }
	
	@RequestMapping("/get_nivo_bar_data")
	public List<Map<String, Object>> getNivoBarData() throws Exception {
        
		List<Map<String, Object>> resultMapList = new ArrayList<Map<String, Object>>();
		
		for(int i=0; i<5; i++) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			String country = "";
			switch (i) {
				case 0: country = "A"; break;
				case 1: country = "B"; break;
				case 2: country = "C"; break;
				case 3: country = "D"; break;
				case 4: country = "E"; break;
				default: break;
			}
			resultMap.put("country", country);
			
			resultMap.put("hot dog", (int)((Math.random()*10000)%200));
			resultMap.put("burger", (int)((Math.random()*10000)%200));
			resultMap.put("sandwich", (int)((Math.random()*10000)%200));
			resultMap.put("kebab", (int)((Math.random()*10000)%200));
			resultMap.put("fries", (int)((Math.random()*10000)%200));
			resultMap.put("donut", (int)((Math.random()*10000)%200));
			resultMapList.add(resultMap);
		}
		
        return resultMapList;
    }
	
	@RequestMapping("/get_nivo_bump_data")
	public List<Map<String, Object>> getNivoBumpData(@RequestBody Map<String, Object> reqMap) throws Exception {
        List<Map<String, Object>> resultMapList = new ArrayList<Map<String, Object>>();
		
        for(int i=0; i<3; i++) {
        	Map<String, Object> dataMap = new HashMap<String, Object>();
    		dataMap.put("x", Integer.parseInt(""+reqMap.get("nextYear")));
    		dataMap.put("y", (int)((Math.random()*10000)%10));
    		resultMapList.add(dataMap);
        }
        
        return resultMapList;
    }
	
	@RequestMapping("/custom/get_line_chartjs_data")
	public Map<String, Object> customGetLineChartjsData() throws Exception {
        
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 0~10사이 난수
		resultMap.put("dataset1", (int)((Math.random()*10000)%10));
		resultMap.put("dataset2", (int)((Math.random()*10000)%10));
		resultMap.put("dataset3", (int)((Math.random()*10000)%10));
		
        return resultMap;
    }
	
	@RequestMapping("/custom/get_bubble_chartjs_data")
	public List<Map<String, Object>> customGetBubbleChartjsData() throws Exception {
		List<Map<String, Object>> resultMapList = new ArrayList<Map<String, Object>>();
		
		for(int i=0; i<3; i++) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("x", (int)((Math.random()*10000)%60));
			resultMap.put("y", (int)((Math.random()*10000)%60));
			resultMap.put("r", (int)((Math.random()*10000)%12)+2);
			resultMapList.add(resultMap);
		}
		
        return resultMapList;
    }
	
	@RequestMapping("/custom/get_bar_chartjs_data")
	public Map<String, Object> customGetBarChartjsData() throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int dataSize = 7;
		int [] data1 = new int[dataSize];
		int [] data2 = new int[dataSize];
		for(int i=0; i<dataSize; i++) {
			data1[i] = (int)((Math.random()*10000)%100);
			data2[i] = (int)((Math.random()*10000)%100);
		}
		resultMap.put("dataset1", data1);
		resultMap.put("dataset2", data2);
        return resultMap;
    }
	
	@RequestMapping("/custom/get_multitype_chartjs_data")
	public Map<String, Object> customGetMultitypeChartjsData() throws Exception {
        
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int dataSize = 7;
		int [] data1 = new int[dataSize];
		int [] data2 = new int[dataSize];
		int [] data3 = new int[dataSize];
		for(int i=0; i<dataSize; i++) {
			int data2Num = (int)((Math.random()*10000)%100);
			int data3Num = (int)((Math.random()*10000)%100);
			data2[i] = data2Num;
			data3[i] = data3Num;
			data1[i] = (int)((data2Num+data3Num)/2);
		}
		
		// 0~10사이 난수
		resultMap.put("dataset1", data1);
		resultMap.put("dataset2", data2);
		resultMap.put("dataset3", data3);
		
        return resultMap;
    }
	
	@RequestMapping("/custom/get_pie_chartjs_data")
	public Map<String, Object> customGetPieChartjsData() throws Exception {
        
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int dataSize = 6;
		int [] data = new int[dataSize];
		for(int i=0; i<dataSize; i++) {
			data[i] = (int)((Math.random()*10000)%20);
		}
		
		resultMap.put("data", data);
		
        return resultMap;
    }
	
	@RequestMapping("/custom/get_radar_chartjs_data")
	public Map<String, Object> customGetRadarChartjsData() throws Exception {
        
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int dataSize = 6;
		int [] data1 = new int[dataSize];
		int [] data2 = new int[dataSize];
		int [] data3 = new int[dataSize];
		for(int i=0; i<dataSize; i++) {
			data1[i] = (int)((Math.random()*10000)%6);
			data2[i] = (int)((Math.random()*10000)%6);
			data3[i] = (int)((Math.random()*10000)%6);
		}
		
		resultMap.put("data1", data1);
		resultMap.put("data2", data2);
		resultMap.put("data3", data3);
		
        return resultMap;
    }
	
	@RequestMapping("/get_db_test_data")
	public List<Map<String, Object>> getDbTestData(TestDto testDto) throws Exception {
        return testService.getDbTestData(testDto);
    }
	
}
