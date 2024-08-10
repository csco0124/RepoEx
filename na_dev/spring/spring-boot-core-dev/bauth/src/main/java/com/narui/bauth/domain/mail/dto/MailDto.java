package com.narui.bauth.domain.mail.dto;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailDto {

	private String from;
	private String to;
	private String[] recipients;
	private String subject; // 제목
	private String content; // 메일 내용
	private boolean useHtml; // 메일 형식이 HTML인지 여부(true, false)
	private List<AttachFileDto> attachFileList;
	
	private String templatePath; // 템플릿 경로
	private HashMap<String, String> values; // 템플릿에 동적으로 추가될 데이터

	private String[] cc;	// 참조
	
	public MailDto() {}
	 
	@Builder
	public MailDto(String from, String to, String[] recipients, String subject, String content, boolean useHtml, 
			List<AttachFileDto> attachFileList, String templatePath, HashMap<String, String> values, String[] cc) {
		this.from = from;
		this.to = to;
		this.recipients = recipients;
		this.subject = subject;
		this.content = content;
		this.useHtml = useHtml;
		this.attachFileList = attachFileList;
		this.templatePath = templatePath;
		this.values = values;
		this.cc = cc;
	}

	@Override
	public String toString() {
		return "MailDto [from=" + from + ", to=" + to + ", recipients=" + Arrays.toString(recipients) + ", subject="
				+ subject + ", content=" + content + ", useHtml=" + useHtml + ", attachFileList=" + attachFileList
				+ ", templatePath=" + templatePath + ", values=" + values + "]";
	}

}