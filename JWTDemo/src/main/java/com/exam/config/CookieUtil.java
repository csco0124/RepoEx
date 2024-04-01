package com.exam.config;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import com.exam.dto.TokenDto;

@Component
public class CookieUtil {
	
	/**
	 * JWT 토큰을 쿠키에 담는다.
	 * @param tokenDto
	 * @param response
	 */
	public void setTokenCookie(TokenDto tokenDto, HttpServletResponse response) {
		
        Cookie cookie = new Cookie("GrantType", tokenDto.getGrantType());
        cookie.setHttpOnly(true);	// Javascript로 쿠키에 접근 못하도록
        response.addCookie(cookie);
        cookie = new Cookie("AccessToken", tokenDto.getAccessToken());
        cookie.setHttpOnly(true);	// Javascript로 쿠키에 접근 못하도록
        response.addCookie(cookie);
        cookie = new Cookie("RefreshToken", tokenDto.getRefreshToken());
        cookie.setHttpOnly(true);	// Javascript로 쿠키에 접근 못하도록
        response.addCookie(cookie);
	}
}
