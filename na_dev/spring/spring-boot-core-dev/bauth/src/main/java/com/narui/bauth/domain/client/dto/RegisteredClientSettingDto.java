package com.narui.bauth.domain.client.dto;

import com.narui.bauth.domain.clientSettingInfo.dto.ClientSettingInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisteredClientSettingDto {
	private ClientSettingInfoDto clientSettingInfoDto;
	private RegisteredClientDto registeredClientDto;
	
	@Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class UserMapping {

		private String id;
		private String clientName;
    }
}
