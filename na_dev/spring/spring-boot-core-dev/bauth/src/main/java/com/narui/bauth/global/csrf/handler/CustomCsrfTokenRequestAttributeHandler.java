package com.narui.bauth.global.csrf.handler;

import java.util.function.Supplier;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomCsrfTokenRequestAttributeHandler extends CsrfTokenRequestAttributeHandler{
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			Supplier<CsrfToken> deferredCsrfToken) {
		// 사용자 정의 헤더명이 없으면 "_csrf"로 처리 
		setCsrfRequestAttributeName(null);
		super.handle(request, response, deferredCsrfToken);
	}
}
