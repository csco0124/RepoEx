package com.narui.bauth.domain.mail.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.narui.common.api.ApiResponse;
import com.narui.bauth.domain.mail.dto.MailDto;
import com.narui.bauth.domain.mail.service.MailService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/mail")
public class MailController {

	private final MailService mailService;
	
	public MailController(MailService mailService) {
		this.mailService = mailService;
	}
	
	@Operation(summary = "이메일 전송")
	@ResponseBody
	@PostMapping("/sendMail")
	public ResponseEntity<ApiResponse<MailDto>> sendMail(@RequestBody MailDto mailDto) throws MessagingException, UnsupportedEncodingException {
		mailService.sendMail(mailDto);
		return ApiResponse.toOkResponseEntity(mailDto);
	}
	
	@ResponseBody
	@PostMapping("/attach/sendMail")
	public ResponseEntity<ApiResponse<MailDto>> attachSendMail(
	    @RequestPart("mailDto") MailDto mailDto,
	    @RequestPart(value = "file", required = false) MultipartFile excelFile
	) throws MessagingException, UnsupportedEncodingException, IOException {
		log.debug("excelFile22 :::: {}", excelFile);
	    // 엑셀 파일 처리 로직 추가
	    if (excelFile != null) {
	    	mailService.sendAttachMail(mailDto, excelFile);
	    }else {
	    	mailService.sendMail(mailDto);
	    }
	    return ApiResponse.toOkResponseEntity(mailDto);
	}
	
	@Operation(summary = "템플릿 이메일 전송")
	@ResponseBody
	@PostMapping("/sendEmailWithTemplate")
	public ResponseEntity<ApiResponse<MailDto>> sendEmailWithTemplate(@RequestBody MailDto mailDto) throws MessagingException, MailParseException { 
		mailService.sendEmailWithTemplate(mailDto);
		return ApiResponse.toOkResponseEntity(mailDto);
	}
	
}
