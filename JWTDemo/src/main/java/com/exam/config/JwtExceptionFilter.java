package com.exam.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.JwtException;

public class JwtExceptionFilter extends OncePerRequestFilter {
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		try {
			chain.doFilter(request, response); // go to 'JwtAuthenticationFilter'
		} catch (JwtException ex) {
			setErrorResponse(HttpStatus.UNAUTHORIZED, response, ex);
		}

	}

	public void setErrorResponse(HttpStatus status, HttpServletResponse response, Throwable ex) throws IOException {
		ErrorResponse error = ErrorResponse.builder().code(HttpServletResponse.SC_FORBIDDEN).message(ex.getMessage()).build();

		String result = mapper.writeValueAsString(error);

		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.getWriter().write(result);
	}
}
