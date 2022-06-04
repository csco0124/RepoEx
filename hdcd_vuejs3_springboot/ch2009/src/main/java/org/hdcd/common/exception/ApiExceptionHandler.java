package org.hdcd.common.exception;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.info("handleMethodArgumentNotValid");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage(ex.getClass().getSimpleName());
		
		List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
		
		for(ObjectError globalError : globalErrors) {
			apiErrorInfo.addDetailInfo(globalError.getObjectName(), globalError.getDefaultMessage());
		}
		
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
		
		for(FieldError fieldError : fieldErrors) {
			apiErrorInfo.addDetailInfo(fieldError.getField(), fieldError.getDefaultMessage());
		}
		
		return super.handleExceptionInternal(ex, apiErrorInfo, headers, status, request);
	}
	
	@Override
	protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.info("handleBindException");
		
		ApiErrorInfo apiErrorInfo = new ApiErrorInfo();
		apiErrorInfo.setMessage(ex.getClass().getSimpleName());
		
		List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
		
		for(ObjectError globalError : globalErrors) {
			apiErrorInfo.addDetailInfo(globalError.getObjectName(), globalError.getDefaultMessage());
		}
		
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
		
		for(FieldError fieldError : fieldErrors) {
			apiErrorInfo.addDetailInfo(fieldError.getField(), fieldError.getDefaultMessage());
		}
		
		return super.handleExceptionInternal(ex, apiErrorInfo, headers, status, request);
	}
	
}


