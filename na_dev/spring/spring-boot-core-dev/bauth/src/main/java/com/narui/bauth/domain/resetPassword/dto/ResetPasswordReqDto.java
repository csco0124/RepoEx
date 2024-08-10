package com.narui.bauth.domain.resetPassword.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResetPasswordReqDto {

	@Schema(description = "이메일")
	@NotEmpty(message = "NotEmpty")
	private String email;
	
	@Schema
	private String resetPasswordId;

	@Schema(description = "비밀번호")
	@NotEmpty(message = "{NotEmpty}")
	private String password;
	
	@Builder
	public ResetPasswordReqDto(String resetPasswordId, String email, String password) {
		this.resetPasswordId = resetPasswordId;
		this.email = email;
		this.password = password;
	}
}
