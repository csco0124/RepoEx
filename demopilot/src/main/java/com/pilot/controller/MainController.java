package com.pilot.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pilot.member.dto.LoginMemberDto;
import com.pilot.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {
	
	private final MemberService memberService;

	@GetMapping("/")
    public String getMain(HttpServletRequest request) {
        return "main...";
    }
	
	@GetMapping("/isLogin")
	public String isLogin(HttpServletRequest request, Authentication authentication) {
		LoginMemberDto loginMemberDto = (LoginMemberDto)authentication.getPrincipal();
		return loginMemberDto.getName();
    }
	
	@GetMapping("/dbTest")
	public Map<String, Object> dbTestGet(HttpServletRequest request) throws Exception {
        return memberService.getCurdate();
    }
	@PostMapping("/dbTest")
	public Map<String, Object> dbTestPost(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception {
		paramMap.put("curDate", memberService.getCurdate());
		return paramMap;
    }
	
	@PostMapping("/join")
	public String joinMember(HttpServletRequest request, @RequestBody Map<String, Object> param) throws Exception {
		log.info("param : " + param);
		memberService.joinMember(param);
        return "Y";
    }
}
