package com.pilot.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler{
	
	@Value("${server.servlet.session.timeout}")
    private int sessionTime;
	
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		
		HttpSession session = request.getSession();	//세션을 가져옴
		session.setMaxInactiveInterval(sessionTime);
		System.out.println("onAuthenticationSuccess sessionID : " + session.getId());
		ErrorResponse error = ErrorResponse.builder().code(HttpServletResponse.SC_OK).message("로그인 성공").build();

		String result = mapper.writeValueAsString(error);

		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().write(result);
	}

}
