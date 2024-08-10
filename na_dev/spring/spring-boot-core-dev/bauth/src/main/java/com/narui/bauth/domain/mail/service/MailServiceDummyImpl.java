package com.narui.bauth.domain.mail.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.context.annotation.Profile;
import org.springframework.mail.MailParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.narui.bauth.domain.mail.dto.MailDto;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Profile("local")
@Slf4j
@RequiredArgsConstructor
@Service
public class MailServiceDummyImpl implements MailService {
	
	@Override
	public void sendMail(MailDto mailDto) throws MessagingException, UnsupportedEncodingException {

		// 로컬에서는 실제 메일 발송하지 않음
		log.debug("dummy sendMail: {} , {}", mailDto.getTo(), mailDto.getSubject());
	}
	
	@Override
	public void sendAttachMail(MailDto mailDto, MultipartFile excelFile) throws MessagingException, UnsupportedEncodingException {
		// 로컬에서는 실제 메일 발송하지 않음
		log.debug("dummy sendMail: {} , {}, {}", mailDto.getTo(), mailDto.getSubject(), excelFile);
	}

	/**
	 * SMS 발송 (sms.gabia.com)
	 */
	public String sendSms(String phone, String message) throws IOException {

		// 로컬에서는 실제 SMS 발송하지 않음
		log.debug("dummy sendSMS: {} , {}", phone, message);
		return "ok";
	}

	@Override
	public void sendEmailWithTemplate(MailDto mailDto) throws MessagingException, MailParseException {
		log.debug("dummy sendEmailWithTemplate: {} , {}", mailDto.getTo(), mailDto.getSubject());
	}
}
