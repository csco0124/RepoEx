package com.narui.bauth.domain.clientSettingInfo.dto;

import com.narui.bauth.global.auditing.dto.BaseTimeDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientSettingInfoDto extends BaseTimeDto{
	private String id;
	private String baseUrl;
	private String homeUri;
	private String logoUri;
}
