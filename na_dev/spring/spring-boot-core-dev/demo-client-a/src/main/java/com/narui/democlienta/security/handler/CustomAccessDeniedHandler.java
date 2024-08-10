package com.narui.democlienta.security.handler;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import org.springframework.stereotype.Component;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ErrorCode;
import com.narui.common.util.HttpUtil;
import com.narui.democlienta.common.util.CommUtil;

import lombok.extern.slf4j.Slf4j;

/**
 * 403 접근 권한 없을 경우 처리
 */
@Component
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	@Value("${server-url}")
    private String serverUrl;

    @Value("${authorization-server-url}")
    private String authorizationServerUrl;
    
    @Value("${client-authority}")
    private String clientAuthority;
    
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,AccessDeniedException exception) throws IOException, ServletException {
		UserDetails userInfo = (UserDetails)CommUtil.getLoginUser();
		log.debug("{} {}", HttpUtil.getRequestInfo(request), exception.getMessage());
		//클라이언트 인증 권한이 없는 경우
//		if(!userInfo.getAuthorities().toString().contains(clientAuthority)) {
//			String referer = request.getHeader("referer");
//	        if(referer.contains(serverUrl)) {
//	        	session.setAttribute("referer", referer);
//	        }
//	        
//			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//			response.sendRedirect("/logout?redirect-url=/private/view/home");//로그아웃 후 로그인 페이지로 이동하기 위한 uri
//			return;
//		}
		
		// Ajax 요청
		if (HttpUtil.isAjaxRequest(request)) {
			// CSRF exception 처리
			if (exception instanceof MissingCsrfTokenException
					|| exception instanceof InvalidCsrfTokenException) { // CSRF exception 별도 처리
				ApiResponse.jsonErrorResponse(response, ErrorCode.CSRF, HttpStatus.FORBIDDEN.value());
				return;
			}
			ApiResponse.jsonErrorResponse(response, ErrorCode.FORBIDDEN, HttpStatus.FORBIDDEN.value());
			return;
		}
		// 일반 요청: 권한없음 403에러페이지로 이동
		response.sendError(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN.getReasonPhrase());
	}
}
