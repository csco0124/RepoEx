package com.exam.controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.config.CookieUtil;
import com.exam.config.JwtTokenProvider;
import com.exam.dto.TokenDto;
import com.exam.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {
	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;
	private final CookieUtil cookieUtil;
	
	@PostMapping("/login")
    public TokenDto login(@RequestBody Map<String, String> paramMap, HttpServletResponse response) {
        String memberId = paramMap.get("memberId");
        String password = paramMap.get("password");
        TokenDto tokenDto = memberService.login(memberId, password);
        cookieUtil.setTokenCookie(tokenDto, response);
        return tokenDto;
    }
	@PostMapping("/validateToken")
    public boolean validateToken(@RequestParam("token") String token) {
    	return jwtTokenProvider.validateToken(token);
    }
	@GetMapping("/getCookie")
	public Cookie[] getCookie(HttpServletRequest request) {
		Cookie[] list = request.getCookies();
		return (list != null)?list:null;
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
