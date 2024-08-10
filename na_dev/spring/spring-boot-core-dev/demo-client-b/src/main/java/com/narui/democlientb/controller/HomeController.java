package com.narui.democlientb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.democlientb.test.service.TestService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {
	
	@Autowired
	public TestService testService;
	
	@Value("${server.type}")
	private String serverType;
	
	@GetMapping("/")
    public String main() {
		System.out.println("서버타입 : " + serverType);
		System.out.println(testService.getCurdate());
		testService.insertTest();
		return "homepage";
    }
	
    @RequestMapping("/home")
    public String home() {
        return "home";
    }

	@GetMapping("/homepage")
	public String homepage() {
		return "homepage";
	}
	
	@GetMapping("/api/callInit")
	public @ResponseBody int callInit() {
		return 0;
	}
	
	@GetMapping("/serverType")
	public @ResponseBody String getServerType() {
		return serverType;
	}
	@GetMapping("/api/serverType")
	public @ResponseBody String getApiServerType() {
		return serverType;
	}
	
	@GetMapping("/api/getResourcePath")
	public @ResponseBody String getResourcePath() {
		return "";
	}
}
