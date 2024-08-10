package com.narui.test.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.common.jwt.JwtTokenProvider;
import com.narui.test.service.TestService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	public JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	public TestService testService;
	
	@GetMapping("/grafana")
    public String grafanaTest() {
		
        return "test/grafana";
    }
	
	@GetMapping("/rest_error")
    public String restErrorTest() {
		throw new RuntimeException("REST ERROR...");
        //return null;
    }
	
	@GetMapping("/jwt")
    public String jwtTest() {
		
        return "test/jwt";
    }
	
	@ResponseBody
	@GetMapping("/jwt/gen_token")
	public Map<String, Object> genToken(@RequestParam(value="subject") String subject, @RequestParam(value="time") long time) {	// time : 30 > 30분
        String token = jwtTokenProvider.createToken(subject, (time * 60 * 1000L), null);
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("result", token);
        return map;
    }
	
	@ResponseBody
	@GetMapping("/jwt/get_subject")
    public Map<String, Object> jwtGetSubjectTest(@RequestParam("token") String token) {
		boolean isExpirationDate = jwtTokenProvider.validateToken(token);
    	String subject = "";
    	if(isExpirationDate) {
    		subject = jwtTokenProvider.getSubject(token);
    	}
    	
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("subject", subject);
        map.put("isExpirationDate", ""+isExpirationDate);
        return map;
    }

}
