package com.pilot.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CsrfController {
	
	/**
	 * postman 등에서의 데이터 테스트를 할 수 있도록 CSRF 토큰 강제 생성
	 * @param request
	 */
	@GetMapping("/csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request, Authentication authentication) {
		return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        
    }
	@PostMapping("/csrf")
    public CsrfToken getCsrfTokenPost(HttpServletRequest request, Authentication authentication) {
		return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        
    }
}
