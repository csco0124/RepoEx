package com.narui.democlientb.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private ObjectMapper objectMapper = new ObjectMapper();
	@Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
		
		//로그인 실패의 경우가 아니면 denied 페이지로 보낸다.
        if (request.getAttribute("LOGIN_EXCEPTION") == null) {
            request.setAttribute("errMsg",authException.getMessage());
            response.setStatus(HttpStatus.OK.value());
            response.sendRedirect("/login/denied");
            return;
        }

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getOutputStream().println(objectMapper.writeValueAsString(request.getAttribute("LOGIN_EXCEPTION")));

    }
}
