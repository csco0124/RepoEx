package com.narui.bauth.domain.config.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ConfigDto {
	
	@Getter
	@Setter
	@NoArgsConstructor
	public static class ConfigResDto {
		private String configKey;
//		@Pattern(regexp = "^\\{.*\\}$", message = "configValue must be a valid JSON object")
		private String configValue;
		
		public ConfigResDto(String configKey, String configValue) {
			this.configKey = configKey;
			this.configValue = configValue;
		}
	}
	
	@Getter
	@Setter
	@NoArgsConstructor
	public static class ConfigReqDto {
		private String configKey;
		private String configValue;
		
		public ConfigReqDto(String configKey, String configValue) {
			this.configKey = configKey;
			this.configValue = configValue;
		}
	}
}
