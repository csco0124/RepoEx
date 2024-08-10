package com.narui.bauth.domain.verifySocial.dto;

import java.sql.Timestamp;

import com.narui.bauth.domain.verifySocial.entity.VerifySocialEntity;
import com.narui.bauth.global.auditing.dto.BaseTimeDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
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
public class VerifySocialDto extends BaseTimeDto{
	@Schema(description = "id")
	private Long id;
	
	@Schema(description = "전화 번호")
	@NotEmpty
	private String phone;
	
	@Schema(description = "인증코드")
	private String verificationCode;
	
	@Schema(description = "소셜 키")
	private String socialKey;
	
	@Schema(description = "소셜 클라이언트 이름")
	private String socialName;
	
	@Schema(description = "유저 id")
	private Long userId;
	
	@Schema(description = "클라이언트 id")
	private String clientId;

	@Schema(description = "이메일")
	private String email;
	
	@Schema(description = "유저 이름")
	@NotEmpty
	private String nickname;
	
	@Schema(description = "갱신 일자")
	private Timestamp lastChallenge;
	
	@Schema(description = "해당 데이터의 활성화 여부")
	private boolean enabled;
	
	@Schema(description = "webauthn 등록 시 사용하는 시크릿 키")
	private String secretKey;
	
	public static VerifySocialDto toDto(VerifySocialEntity entity) {
		return VerifySocialDto.builder()
					.id(entity.getId())
					.phone(entity.getPhone())
					.verificationCode(entity.getVerificationCode())
					.socialKey(entity.getSocialKey())
					.socialName(entity.getSocialName())
					.userId(entity.getUserId())
					.clientId(entity.getClientId())
					.email(entity.getEmail())
					.nickname(entity.getNickname())
					.lastChallenge(entity.getLastChallenge())
					.enabled(entity.isEnabled())
					.secretKey(entity.getSecretKey())
				.build();
	}
}
