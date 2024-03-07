package com.pilot.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionHandling {

	private ObjectMapper mapper = new ObjectMapper();

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<?> handleNoSuchElementFoundException(Exception e) throws Exception {

		ErrorResponse error = ErrorResponse.builder().code(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).message(e.getMessage()).build();

		String result = mapper.writeValueAsString(error);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
	}
}
