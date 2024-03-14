package com.pilot.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {
	private final SessionRegistry sessionRegistry;
	
	@GetMapping("/sessionList")
	public String sessionList(HttpServletRequest request, Model model, HttpSession session) {
	    List<Object> allPrincipals = sessionRegistry.getAllPrincipals();
	    // SessionInformation ss = sessionRegistry.getSessionInformation(s.getSessionId());
    	// System.out.println(ss);
	    List<SessionInformation> sessions = null;
	    // 각 Principal(사용자)에 대한 세션 정보를 가져옵니다.
	    for (Object principal : allPrincipals) {
	        if (principal instanceof UserDetails) {
	            UserDetails userDetails = (UserDetails) principal;
	            // 현재 사용자의 모든 세션 정보를 가져옵니다.
	            sessions = sessionRegistry.getAllSessions(userDetails, false);
	            for(SessionInformation s : sessions) {
	            	System.out.println(userDetails.getUsername());
	            	System.out.println(s.getSessionId());
	            	// s.expireNow()	// 사용자 세션 만료시킴
	            }
	        }
	    }
	    
	    // https://seungyong.tistory.com/48
	    System.out.println(sessions);
	    return "home";
	}
}
