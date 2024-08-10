package com.narui.bauth.domain.mail.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;


import org.springframework.mail.MailParseException;
import org.springframework.web.multipart.MultipartFile;

import com.narui.bauth.domain.mail.dto.MailDto;

import jakarta.mail.MessagingException;

public interface MailService {

  public void sendMail(MailDto mailDto) throws MessagingException, UnsupportedEncodingException;
  
  public void sendAttachMail(MailDto mailDto, MultipartFile excelFile) throws MessagingException, UnsupportedEncodingException, IOException;
  
  public String sendSms(String phone, String message) throws IOException;
  
  public void sendEmailWithTemplate(MailDto mailDto) throws MessagingException, MailParseException;
}
