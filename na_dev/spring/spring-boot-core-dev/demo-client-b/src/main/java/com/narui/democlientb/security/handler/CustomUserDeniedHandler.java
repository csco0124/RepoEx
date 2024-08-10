package com.narui.democlientb.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class CustomUserDeniedHandler implements AccessDeniedHandler{
	@Override
	public void handle(HttpServletRequest requset, HttpServletResponse response, AccessDeniedException ade) throws IOException, ServletException {
		requset.setAttribute("errMsg",ade.getMessage());
		response.setStatus(HttpStatus.OK.value());
        response.sendRedirect("/login/denied");
        
        
        
        
        
	}
}
