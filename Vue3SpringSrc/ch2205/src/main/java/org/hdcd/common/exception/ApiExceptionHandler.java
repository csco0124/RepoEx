package org.hdcd.common.exception;

import org.hdcd.exception.BoardRecordNotFoundException;
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
	
	@ExceptionHandler
	public ResponseEntity<Object> handleBoardRecordNotFoundException(BoardRecordNotFoundException ex, WebRequest request) {
		log.info("handleBoardRecordNotFoundException");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage("BoardRecord Not Found");
		
		return super.handleExceptionInternal(ex, apiErrorInfo, null, HttpStatus.NOT_FOUND, request);
	}

}
