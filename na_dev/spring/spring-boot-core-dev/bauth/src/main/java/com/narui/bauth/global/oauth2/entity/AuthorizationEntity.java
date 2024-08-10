package com.narui.bauth.global.oauth2.entity;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "oauth2_authorization")
public class AuthorizationEntity {

	@Id
	private String id;

	private String registeredClientId;

	private String principalName;

	private String authorizationGrantType;

	@Column(length = 1000)
	private String authorizedScopes;

	@Lob
	@Column(length = 8000)
	private String attributes;

	@Column(length = 500)
	private String state;

	@Column(length = 1000)
	private String authorizationCodeValue;

	private Instant authorizationCodeIssuedAt;

	private Instant authorizationCodeExpiresAt;

	@Column(length = 1000)
	private String authorizationCodeMetadata;

	@Column(length = 1000)
	private String accessTokenValue;

	private Instant accessTokenIssuedAt;

	private Instant accessTokenExpiresAt;

	@Column(length = 1000)
	private String accessTokenMetadata;

	private String accessTokenType;

	@Column(length = 1000)
	private String accessTokenScopes;

	@Column(length = 1000)
	private String refreshTokenValue;

	private Instant refreshTokenIssuedAt;

	private Instant refreshTokenExpiresAt;

	@Column(length = 1000)
	private String refreshTokenMetadata;

	@Column(length = 1000)
	private String oidcIdTokenValue;

	private Instant oidcIdTokenIssuedAt;

	private Instant oidcIdTokenExpiresAt;

	@Column(length = 1000)
	private String oidcIdTokenMetadata;

	@Column(length = 1000)
	private String oidcIdTokenClaims;

}