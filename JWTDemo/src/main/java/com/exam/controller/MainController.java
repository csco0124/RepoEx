package com.exam.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.TokenDto;
import com.exam.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {
	private final MemberService memberService;
	
	@PostMapping("/login")
    public TokenDto login(@RequestBody Map<String, String> paramMap) {
        String memberId = paramMap.get("memberId");
        String password = paramMap.get("password");
        TokenDto tokenDto = memberService.login(memberId, password);
        return tokenDto;
    }
    
	@GetMapping("/test")
    public String testGet() {
    	return "testGet";
    }
    @PostMapping("/test")
    public String testPost() {
    	return "testPost";
    }
    @PostMapping("/testAuth")
    public String testAuth() {
    	return "testAuth success";
    }
}
