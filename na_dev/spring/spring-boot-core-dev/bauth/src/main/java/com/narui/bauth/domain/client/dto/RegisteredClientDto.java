package com.narui.bauth.domain.client.dto;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

import com.narui.bauth.global.search.dto.PageableDto;
import com.narui.bauth.global.search.dto.SearchCriteria;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisteredClientDto {
	@Schema(description = "클라이언트 ID")
	private String clientId;

	@Schema(description = "클라이언트 Secret")
	private String clientSecret;

	@Schema(description = "클라이언트 이름")
	private String clientName;

	@Schema(description = "클라이언트 인증 유형",
			allowableValues = {
					"client_secret_basic",
					"client_secret_post",
					"client_secret_jwt",
					"private_key_jwt",
					"none",
	})
	private Set<ClientAuthenticationMethod> clientAuthenticationMethods;

	@Schema(description = "클라이언트 자격증명 유형",
			allowableValues = {
					"authorization_code",
					"refresh_token",
					"client_credentials",
					"password",
					"urn:ietf:params:oauth:grant-type:jwt-bearer"
	})
	private Set<AuthorizationGrantType> authorizationGrantTypes;

	@Schema(description = "클라이언트 redirect URI")
	private Set<String> redirectUris;

	@Schema(description = "클라이언트 scopes")
	private Set<String> scopes;

	@Schema(description = "clientSettings")
	private ClientSetting clientSettings;

	@Schema(description = "tokenSettings")
	private TokenSetting tokenSettings;

	@Builder
	public RegisteredClientDto(
			String clientId,
			String clientSecret,
			String clientName,
			Set<ClientAuthenticationMethod> clientAuthenticationMethods,
			Set<AuthorizationGrantType> authorizationGrantTypes,
			Set<String> redirectUris,
			Set<String> scopes,
			ClientSetting clientSettings,
			TokenSetting tokenSettings
			) {
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.clientName = clientName;
		this.clientAuthenticationMethods = clientAuthenticationMethods;
		this.authorizationGrantTypes = authorizationGrantTypes;
		this.redirectUris = redirectUris;
		this.scopes = scopes;
		this.clientSettings = clientSettings;
		this.tokenSettings = tokenSettings;
	}

	public static RegisteredClientDto toDto(RegisteredClient registeredClient) {
		return RegisteredClientDto.builder()
				.clientId(registeredClient.getClientId())
				.clientSecret(registeredClient.getClientSecret())
				.clientName(registeredClient.getClientName())
				.clientAuthenticationMethods(registeredClient.getClientAuthenticationMethods())
				.authorizationGrantTypes(registeredClient.getAuthorizationGrantTypes())
				.redirectUris(registeredClient.getRedirectUris())
				.scopes(registeredClient.getScopes())
				.clientSettings(new ClientSetting(registeredClient.getClientSettings()))
				.tokenSettings(new TokenSetting(registeredClient.getTokenSettings()))
				.build();
	}

	public RegisteredClient toRegisteredClient() {

		/*
		 * Returns true if the client is required to provide a proof key challenge and verifier
		 * when performing the Authorization Code Grant flow. The default is false.
		 * */
		boolean requireProofKey = clientSettings.isRequireProofKey();

		/*
		 * Returns true if authorization consent is required when the client requests access. The default is false.
		 * */
		boolean requireAuthorizationConsent = clientSettings.isRequireAuthorizationConsent();

		/*
		 * jwkSerUrl 은 http://인증서버/oauth2/jwks 고정
		 * */
		String jwkSetUrl = clientSettings.getJwkSetUrl();

		ClientSettings clientSettings = ClientSettings.builder()
				.requireProofKey(requireProofKey)
				.requireAuthorizationConsent(requireAuthorizationConsent)
				.tokenEndpointAuthenticationSigningAlgorithm(SignatureAlgorithm.RS256)
				.jwkSetUrl(jwkSetUrl)
				.build();

		/*
		 * accessToken 타임아웃(분)
		 * */
		Duration accessTokenTimeToLive =
				Duration.ofMinutes(tokenSettings.getAccessTokenTimeToLive());

		boolean reuseRefreshTokens =
				tokenSettings.isReuseRefreshTokens();

		/*
		 * refreshToken 타임아웃(분)
		 * */
		Duration refreshTokenTimeToLive =
				Duration.ofMinutes(tokenSettings.getRefreshTokenTimeToLive());

		//		SignatureAlgorithm idTokenSignatureAlgorithm =
		//				SignatureAlgorithm.valueOf(tokenSettings.get("idTokenSignatureAlgorithm").toString());

		TokenSettings.Builder tokenSettingsBuilder = TokenSettings.builder()
				.accessTokenTimeToLive(accessTokenTimeToLive)
				.reuseRefreshTokens(reuseRefreshTokens)
				.refreshTokenTimeToLive(refreshTokenTimeToLive)
				.idTokenSignatureAlgorithm(SignatureAlgorithm.RS256);

		if (OAuth2TokenFormat.SELF_CONTAINED.getValue().equals(tokenSettings.getAccessTokenFormat())) {
			tokenSettingsBuilder.accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED);
		} else {
			tokenSettingsBuilder.accessTokenFormat(OAuth2TokenFormat.REFERENCE);
		}

		return RegisteredClient.withId(UUID.randomUUID().toString())
				.clientId(clientId)
				.clientSecret(clientSecret)
				.clientName(clientName)
				.clientAuthenticationMethods(list -> list.addAll(clientAuthenticationMethods))
				.authorizationGrantTypes(list -> list.addAll(authorizationGrantTypes))
				.redirectUris(list -> list.addAll(redirectUris))
				.scopes(list -> list.addAll(scopes))
				.clientSettings(clientSettings)
				.tokenSettings(tokenSettingsBuilder.build())
				.build();
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Search extends PageableDto {

		@Valid // List안쪽의 값도 Vali를 하기 위해 추가
		private List<SearchCriteria> searchCriteriaList;

		@Pattern(regexp = "^(all|any)$")
		private String dataOption;

		// DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(id|clientId|clientName)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class SearchRes {
		@Schema(description = ".com 형식 클라이언트 ID")
		private String clientId;

		@Schema(description = "클라이언트 Secret")
		private String clientSecret;

		@Schema(description = "클라이언트 이름")
		private String clientName;

		@Schema(description = "클라이언트 id")
		private String id;

		@Schema(description = "클라이언트 base_url")
		private String baseUrl;

		@Schema(description = "클라이언트 home_url")
		private String homeUri;
	}

}
