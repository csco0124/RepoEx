package com.narui.bauth.domain.mail.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachFileDto {

	private String realFileNm;
	private String attachFileNm;
	
	public AttachFileDto() {}
	
	@Builder
	public AttachFileDto(String realFileNm, String attachFileNm) {
		this.realFileNm = realFileNm;
		this.attachFileNm = attachFileNm;
	}

	@Override
	public String toString() {
		return "AttachFileDto [realFileNm=" + realFileNm + ", attachFileNm=" + attachFileNm + "]";
	}
	
}
