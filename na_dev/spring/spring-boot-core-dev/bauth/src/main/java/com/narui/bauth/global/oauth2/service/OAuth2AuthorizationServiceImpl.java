package com.narui.bauth.global.oauth2.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.security.jackson2.SecurityJackson2Modules;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationCode;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.jackson2.OAuth2AuthorizationServerJackson2Module;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narui.bauth.domain.client.repository.RegisteredClientRepositoryImpl;
import com.narui.bauth.global.mfa.authentication.MultiFactorAuthenticationDetails;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.oauth2.entity.AuthorizationEntity;
import com.narui.bauth.global.oauth2.mixin.LongMixin;
import com.narui.bauth.global.oauth2.mixin.MultiFactorAuthenticationDetailsMixin;
import com.narui.bauth.global.oauth2.mixin.MultiFactorUserDetailsMixin;
import com.narui.bauth.global.oauth2.mixin.TimeStampMixin;
import com.narui.bauth.global.oauth2.mixin.WebAuthnAuthenticationTokenMixin;
import com.narui.bauth.global.oauth2.repository.AuthorizationRepository;
import com.webauthn4j.springframework.security.WebAuthnAuthenticationToken;

@Component
public class OAuth2AuthorizationServiceImpl implements OAuth2AuthorizationService {
	private final AuthorizationRepository authorizationRepository;
    private final RegisteredClientRepositoryImpl registeredClientRepository;
	private final ObjectMapper objectMapper = new ObjectMapper();
	

	public OAuth2AuthorizationServiceImpl(AuthorizationRepository authorizationRepository, RegisteredClientRepositoryImpl registeredClientRepository) {
		Assert.notNull(authorizationRepository, "authorizationRepository cannot be null");
		Assert.notNull(registeredClientRepository, "registeredClientRepository cannot be null");
		this.authorizationRepository = authorizationRepository;
		this.registeredClientRepository = registeredClientRepository;

		ClassLoader classLoader = OAuth2AuthorizationServiceImpl.class.getClassLoader();
		List<com.fasterxml.jackson.databind.Module> securityModules = SecurityJackson2Modules.getModules(classLoader);
		this.objectMapper.registerModules(securityModules);
		this.objectMapper.registerModule(new OAuth2AuthorizationServerJackson2Module());

		// FIX: Deserialize 오류 수정
		this.objectMapper.addMixIn(MultiFactorUserDetails.class, MultiFactorUserDetailsMixin.class);
		this.objectMapper.addMixIn(MultiFactorAuthenticationDetails.class, MultiFactorAuthenticationDetailsMixin.class);
		this.objectMapper.addMixIn(WebAuthnAuthenticationToken.class, WebAuthnAuthenticationTokenMixin.class);
		this.objectMapper.addMixIn(Long.class, LongMixin.class);
		this.objectMapper.addMixIn(Timestamp.class, TimeStampMixin.class);
	}

	@Override
	public void save(OAuth2Authorization authorization) {
		Assert.notNull(authorization, "authorization cannot be null");
		this.authorizationRepository.save(toEntity(authorization));
	}

	@Override
	public void remove(OAuth2Authorization authorization) {
		Assert.notNull(authorization, "authorization cannot be null");
		this.authorizationRepository.deleteById(authorization.getId());
	}

	@Override
	public OAuth2Authorization findById(String id) {
		Assert.hasText(id, "id cannot be empty");
		return this.authorizationRepository.findById(id).map(this::toObject).orElse(null);
	}

	@Override
	public OAuth2Authorization findByToken(String token, OAuth2TokenType tokenType) {
		Assert.hasText(token, "token cannot be empty");

		Optional<AuthorizationEntity> result;
		if (tokenType == null) {
			result = this.authorizationRepository.findByStateOrAuthorizationCodeValueOrAccessTokenValueOrRefreshTokenValue(token);
		} else if (OAuth2ParameterNames.STATE.equals(tokenType.getValue())) {
			result = this.authorizationRepository.findByState(token);
		} else if (OAuth2ParameterNames.CODE.equals(tokenType.getValue())) {
			result = this.authorizationRepository.findByAuthorizationCodeValue(token);
		} else if (OAuth2ParameterNames.ACCESS_TOKEN.equals(tokenType.getValue())) {
			result = this.authorizationRepository.findByAccessTokenValue(token);
		} else if (OAuth2ParameterNames.REFRESH_TOKEN.equals(tokenType.getValue())) {
			result = this.authorizationRepository.findByRefreshTokenValue(token);
		} else {
			result = Optional.empty();
		}

		return result.map(this::toObject).orElse(null);
	}

	private OAuth2Authorization toObject(AuthorizationEntity entity) {
		RegisteredClient registeredClient = this.registeredClientRepository.findById(entity.getRegisteredClientId());
		if (registeredClient == null) {
			throw new DataRetrievalFailureException(
					"The RegisteredClient with id '" + entity.getRegisteredClientId() + "' was not found in the RegisteredClientRepository.");
		}

		OAuth2Authorization.Builder builder = OAuth2Authorization.withRegisteredClient(registeredClient)
				.id(entity.getId())
				.principalName(entity.getPrincipalName())
				.authorizationGrantType(resolveAuthorizationGrantType(entity.getAuthorizationGrantType()))
				.authorizedScopes(StringUtils.commaDelimitedListToSet(entity.getAuthorizedScopes()))
				.attributes(attributes -> attributes.putAll(parseMap(entity.getAttributes())));
		if (entity.getState() != null) {
			builder.attribute(OAuth2ParameterNames.STATE, entity.getState());
		}

		if (entity.getAuthorizationCodeValue() != null) {
			OAuth2AuthorizationCode authorizationCode = new OAuth2AuthorizationCode(
					entity.getAuthorizationCodeValue(),
					entity.getAuthorizationCodeIssuedAt(),
					entity.getAuthorizationCodeExpiresAt());
			builder.token(authorizationCode, metadata -> metadata.putAll(parseMap(entity.getAuthorizationCodeMetadata())));
		}

		if (entity.getAccessTokenValue() != null) {
			OAuth2AccessToken accessToken = new OAuth2AccessToken(
					OAuth2AccessToken.TokenType.BEARER,
					entity.getAccessTokenValue(),
					entity.getAccessTokenIssuedAt(),
					entity.getAccessTokenExpiresAt(),
					StringUtils.commaDelimitedListToSet(entity.getAccessTokenScopes()));
			builder.token(accessToken, metadata -> metadata.putAll(parseMap(entity.getAccessTokenMetadata())));
		}

		if (entity.getRefreshTokenValue() != null) {
			OAuth2RefreshToken refreshToken = new OAuth2RefreshToken(
					entity.getRefreshTokenValue(),
					entity.getRefreshTokenIssuedAt(),
					entity.getRefreshTokenExpiresAt());
			builder.token(refreshToken, metadata -> metadata.putAll(parseMap(entity.getRefreshTokenMetadata())));
		}

		if (entity.getOidcIdTokenValue() != null) {
			OidcIdToken idToken = new OidcIdToken(
					entity.getOidcIdTokenValue(),
					entity.getOidcIdTokenIssuedAt(),
					entity.getOidcIdTokenExpiresAt(),
					parseMap(entity.getOidcIdTokenClaims()));
			builder.token(idToken, metadata -> metadata.putAll(parseMap(entity.getOidcIdTokenMetadata())));
		}

		return builder.build();
	}

	private AuthorizationEntity toEntity(OAuth2Authorization authorization) {
		AuthorizationEntity entity = new AuthorizationEntity();
		entity.setId(authorization.getId());
		entity.setRegisteredClientId(authorization.getRegisteredClientId());
		entity.setPrincipalName(authorization.getPrincipalName());
		entity.setAuthorizationGrantType(authorization.getAuthorizationGrantType().getValue());
		entity.setAuthorizedScopes(StringUtils.collectionToDelimitedString(authorization.getAuthorizedScopes(), ","));
		entity.setAttributes(writeMap(authorization.getAttributes()));
		entity.setState(authorization.getAttribute(OAuth2ParameterNames.STATE));

		OAuth2Authorization.Token<OAuth2AuthorizationCode> authorizationCode =
				authorization.getToken(OAuth2AuthorizationCode.class);
		setTokenValues(
				authorizationCode,
				entity::setAuthorizationCodeValue,
				entity::setAuthorizationCodeIssuedAt,
				entity::setAuthorizationCodeExpiresAt,
				entity::setAuthorizationCodeMetadata
		);

		OAuth2Authorization.Token<OAuth2AccessToken> accessToken =
				authorization.getToken(OAuth2AccessToken.class);
		setTokenValues(
				accessToken,
				entity::setAccessTokenValue,
				entity::setAccessTokenIssuedAt,
				entity::setAccessTokenExpiresAt,
				entity::setAccessTokenMetadata
		);
		if (accessToken != null && accessToken.getToken().getScopes() != null) {
			entity.setAccessTokenScopes(StringUtils.collectionToDelimitedString(accessToken.getToken().getScopes(), ","));
		}

		OAuth2Authorization.Token<OAuth2RefreshToken> refreshToken =
				authorization.getToken(OAuth2RefreshToken.class);
		setTokenValues(
				refreshToken,
				entity::setRefreshTokenValue,
				entity::setRefreshTokenIssuedAt,
				entity::setRefreshTokenExpiresAt,
				entity::setRefreshTokenMetadata
		);

		OAuth2Authorization.Token<OidcIdToken> oidcIdToken =
				authorization.getToken(OidcIdToken.class);
		setTokenValues(
				oidcIdToken,
				entity::setOidcIdTokenValue,
				entity::setOidcIdTokenIssuedAt,
				entity::setOidcIdTokenExpiresAt,
				entity::setOidcIdTokenMetadata
		);
		if (oidcIdToken != null) {
			entity.setOidcIdTokenClaims(writeMap(oidcIdToken.getClaims()));
		}

		return entity;
	}

	private void setTokenValues(
			OAuth2Authorization.Token<?> token,
			Consumer<String> tokenValueConsumer,
			Consumer<Instant> issuedAtConsumer,
			Consumer<Instant> expiresAtConsumer,
			Consumer<String> metadataConsumer) {
		if (token != null) {
			OAuth2Token oAuth2Token = token.getToken();
			tokenValueConsumer.accept(oAuth2Token.getTokenValue());
			issuedAtConsumer.accept(oAuth2Token.getIssuedAt());
			expiresAtConsumer.accept(oAuth2Token.getExpiresAt());
			metadataConsumer.accept(writeMap(token.getMetadata()));
		}
	}

	private Map<String, Object> parseMap(String data) {
		try {
			return this.objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {
			});
		} catch (Exception ex) {
			throw new IllegalArgumentException(ex.getMessage(), ex);
		}
	}

	private String writeMap(Map<String, Object> metadata) {
		try {
			return this.objectMapper.writeValueAsString(metadata);
		} catch (Exception ex) {
			throw new IllegalArgumentException(ex.getMessage(), ex);
		}
	}

	private static AuthorizationGrantType resolveAuthorizationGrantType(String authorizationGrantType) {
		if (AuthorizationGrantType.AUTHORIZATION_CODE.getValue().equals(authorizationGrantType)) {
			return AuthorizationGrantType.AUTHORIZATION_CODE;
		} else if (AuthorizationGrantType.CLIENT_CREDENTIALS.getValue().equals(authorizationGrantType)) {
			return AuthorizationGrantType.CLIENT_CREDENTIALS;
		} else if (AuthorizationGrantType.REFRESH_TOKEN.getValue().equals(authorizationGrantType)) {
			return AuthorizationGrantType.REFRESH_TOKEN;
		}
		return new AuthorizationGrantType(authorizationGrantType);              // Custom authorization grant type
	}



}