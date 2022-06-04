package org.hdcd.common.exception;

import org.hdcd.exception.BoardRecordNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.info("handleExceptionInternal");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage(ex.getClass().getSimpleName());
		
		return super.handleExceptionInternal(ex, apiErrorInfo, headers, status, request);
	}

	@ExceptionHandler
	public ResponseEntity<Object> handleBoardRecordNotFoundException(BoardRecordNotFoundException ex, WebRequest request) {
		log.info("handleBoardRecordNotFoundException");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage("BoardRecord Not Found");
		
		return super.handleExceptionInternal(ex, apiErrorInfo, null, HttpStatus.NOT_FOUND, request);
	}
	
	@ExceptionHandler
	public ResponseEntity<Object> handleSystemException(Exception ex, WebRequest request) {
		log.info("handleSystemException");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage(ex.getClass().getSimpleName());
		
		return super.handleExceptionInternal(ex, apiErrorInfo, null, HttpStatus.INTERNAL_SERVER_ERROR, request);
	}
	
}
