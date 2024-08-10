package com.narui.bauth.domain.socialAuth.entity;

import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity(name = "social_info")
@Getter
@Builder
@AllArgsConstructor
public class SocialInfoEntity extends BaseTimeEntity{
	@Id
	private Long id;
	
	@Schema(description = "해당 소셜 정보가 들어갈 클라이언트의 registered_client id")
	@Column(name = "registered_client_id")
	@Size(max = 255)
	private String registeredClientId;
	
	@Schema(description = "해당 소셜의 클라이언트 아이디")
	@Column(name = "social_client_id")
	private String socialClientId;
	
	@Schema(description = "해당 소셜의 클라이언트 시크릿")
	@Column(name = "social_client_secret")
	private String socialClientSecret;
	
	@Schema(description = "소셜 인증 성공 시 리다이렉트 할 주소 설정")
	@Column(name = "redirect_uri", length = 1000)
	private String redirectUri;
	
	@Schema(description = "소셜 클라이언트 이름")
	@Column(name = "client_name")
	private String clientName;
	
	@Schema(description = "해당 클라이언트 제공할 정보")
	@Column(length = 1000)
	private String scope;
	
}
