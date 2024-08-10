package com.narui.bauth.global.auditing.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

public class BaseTimeDto {
	@Schema(description = "생성 일자")
	private LocalDateTime createdDate;

	@Schema(description = "수정 일자")
	private LocalDateTime modifiedDate;
}
