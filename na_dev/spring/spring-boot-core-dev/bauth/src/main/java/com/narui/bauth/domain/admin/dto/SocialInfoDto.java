package com.narui.bauth.domain.admin.dto;

import com.narui.bauth.domain.socialAuth.entity.SocialInfoEntity;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class SocialInfoDto {
	private Long id;
	@Schema(description = "해당 소셜의 클라이언트 아이디")
	private String socialClientId;
	@Schema(description = "해당 소셜의 클라이언트 시크릿")
	private String socialClientSecret;
	@Schema(description = "소셜 인증 성공 시 리다이렉트 할 주소 설정")
	private String redirectUri;
	@Schema(description = "소셜 클라이언트 이름")
	private String clientName;
	@Schema(description = "해당 클라이언트 제공할 정보")
	private String scope;
	
	public SocialInfoEntity toEntity() {
		return SocialInfoEntity.builder()
				.id(id)
				.socialClientId(socialClientId)
				.socialClientSecret(socialClientSecret)
				.redirectUri(redirectUri)
				.clientName(clientName)
				.scope(scope)
			.build();
	}
	
	public static SocialInfoDto toDto(SocialInfoEntity entity) {
		return SocialInfoDto.builder()
				.id(entity.getId())
				.socialClientId(entity.getSocialClientId())
				.socialClientSecret(entity.getSocialClientSecret())
				.redirectUri(entity.getRedirectUri())
				.clientName(entity.getClientName())
				.scope(entity.getScope())
			.build();
	}
}
