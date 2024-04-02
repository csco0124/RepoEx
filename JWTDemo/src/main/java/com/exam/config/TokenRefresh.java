package com.exam.config;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.exam.dto.TokenDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenRefresh {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final CookieUtil cookieUtil;
	
	public TokenDto execute(HttpServletRequest request, HttpServletResponse response) throws Exception{
		TokenDto tokenDto = null;
		Cookie[] list = request.getCookies();
		String refreshToken = "";
		for(Cookie c : list) {
			if("RefreshToken".equals(c.getName())) {
				refreshToken = c.getValue();
			}
		}
		if(jwtTokenProvider.validateToken(refreshToken)) {
			Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
			tokenDto = jwtTokenProvider.generateToken(authentication);
			cookieUtil.setTokenCookie(tokenDto, response);
		}
		return tokenDto;
	}

}
