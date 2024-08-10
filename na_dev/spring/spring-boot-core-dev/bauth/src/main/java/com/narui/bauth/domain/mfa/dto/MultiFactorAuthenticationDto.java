package com.narui.bauth.domain.mfa.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class MultiFactorAuthenticationDto {
	private String auth;
	private String email;
}