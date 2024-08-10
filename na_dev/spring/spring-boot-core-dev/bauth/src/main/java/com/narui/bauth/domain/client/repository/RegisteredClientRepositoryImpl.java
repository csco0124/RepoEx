package com.narui.bauth.domain.client.repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.jackson2.SecurityJackson2Modules;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.jackson2.OAuth2AuthorizationServerJackson2Module;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;
import com.narui.bauth.global.util.PrincipalUtil;

@Component
public class RegisteredClientRepositoryImpl implements RegisteredClientRepository {
	private final ClientRepository clientRepository;
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final PrincipalUtil principalUtil;

	public RegisteredClientRepositoryImpl(ClientRepository clientRepository, PrincipalUtil principalUtil) {
		Assert.notNull(clientRepository, "clientRepository cannot be null");
		this.clientRepository = clientRepository;
		this.principalUtil = principalUtil;

		ClassLoader classLoader = RegisteredClientRepositoryImpl.class.getClassLoader();
		List<com.fasterxml.jackson.databind.Module> securityModules = SecurityJackson2Modules.getModules(classLoader);
		this.objectMapper.registerModules(securityModules);
		this.objectMapper.registerModule(new OAuth2AuthorizationServerJackson2Module());
	}

	@Override
	public void save(RegisteredClient registeredClient) {
		Assert.notNull(registeredClient, "registeredClient cannot be null");
		this.clientRepository.save(toEntity(registeredClient));
	}
	
	public void save(RegisteredClient registeredClient, ClientSettingInfoEntity clientSettingInfoEntity) {
		Assert.notNull(registeredClient, "registeredClient cannot be null");
		ClientEntity clientEntity = toEntity(registeredClient);
		
		if(Objects.equals(clientSettingInfoEntity.getClientEntity(), null)) {
			clientSettingInfoEntity.updateClientEntity(clientEntity);
		}
		
		clientEntity.updateClientSettingInfo(clientSettingInfoEntity);
		
		this.clientRepository.save(clientEntity);
	}

	@Override
	public RegisteredClient findById(String id) {
		Assert.hasText(id, "id cannot be empty");
		return this.clientRepository.findById(id).map(this::toObject).orElse(null);
	}

	@Override
	public RegisteredClient findByClientId(String clientId) {
		Assert.hasText(clientId, "clientId cannot be empty");
		return this.clientRepository.findByClientId(clientId).map(this::toObject).orElse(null);
	}

	//
	public List<RegisteredClient> findAll(Pageable pageable) {
		return this.clientRepository.findAll(pageable).stream().map(this::toObject).collect(Collectors.toList());
	}

	//
    public List<RegisteredClient> findByOwner(String ownerName) {
		return this.clientRepository.findByOwner(ownerName).stream().map(this::toObject).collect(Collectors.toList());
    }

	//
    public void deleteById(String registeredClientId) {
		clientRepository.deleteById(registeredClientId);
    }



	private RegisteredClient toObject(ClientEntity client) {
		Set<String> clientAuthenticationMethods = StringUtils.commaDelimitedListToSet(
				client.getClientAuthenticationMethods());
		Set<String> authorizationGrantTypes = StringUtils.commaDelimitedListToSet(
				client.getAuthorizationGrantTypes());
		Set<String> redirectUris = StringUtils.commaDelimitedListToSet(
				client.getRedirectUris());
		Set<String> clientScopes = StringUtils.commaDelimitedListToSet(
				client.getScopes());

		RegisteredClient.Builder builder = RegisteredClient.withId(client.getId())
				.clientId(client.getClientId())
				.clientIdIssuedAt(client.getClientIdIssuedAt())
				.clientSecret(client.getClientSecret())
				.clientSecretExpiresAt(client.getClientSecretExpiresAt())
				.clientName(client.getClientName())
				.clientAuthenticationMethods(authenticationMethods ->
						clientAuthenticationMethods.forEach(authenticationMethod ->
								authenticationMethods.add(resolveClientAuthenticationMethod(authenticationMethod))))
				.authorizationGrantTypes((grantTypes) ->
						authorizationGrantTypes.forEach(grantType ->
								grantTypes.add(resolveAuthorizationGrantType(grantType))))
				.redirectUris((uris) -> uris.addAll(redirectUris))
				.scopes((scopes) -> scopes.addAll(clientScopes));

		Map<String, Object> clientSettingsMap = parseMap(client.getClientSettings());
		builder.clientSettings(ClientSettings.withSettings(clientSettingsMap).build());

		Map<String, Object> tokenSettingsMap = parseMap(client.getTokenSettings());
		builder.tokenSettings(TokenSettings.withSettings(tokenSettingsMap).build());

		return builder.build();
	}

	private ClientEntity toEntity(RegisteredClient registeredClient) {

		//
		//UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails principal = (UserDetails) principalUtil.getPrincipal();

		List<String> clientAuthenticationMethods = new ArrayList<>(registeredClient.getClientAuthenticationMethods().size());
		registeredClient.getClientAuthenticationMethods().forEach(clientAuthenticationMethod ->
				clientAuthenticationMethods.add(clientAuthenticationMethod.getValue()));

		List<String> authorizationGrantTypes = new ArrayList<>(registeredClient.getAuthorizationGrantTypes().size());
		registeredClient.getAuthorizationGrantTypes().forEach(authorizationGrantType ->
				authorizationGrantTypes.add(authorizationGrantType.getValue()));

		ClientEntity clientEntity = clientRepository.findById(registeredClient.getId()).orElse(null);
		
		ClientEntity entity = ClientEntity.builder()
				.id(registeredClient.getId())
				.clientId(registeredClient.getClientId())
				.clientIdIssuedAt(registeredClient.getClientIdIssuedAt())
				.clientSecret(registeredClient.getClientSecret())
				.owner(principal.getUsername())
				.clientSecretExpiresAt(registeredClient.getClientSecretExpiresAt())
				.clientName(registeredClient.getClientName())
				.clientAuthenticationMethods(StringUtils.collectionToCommaDelimitedString(clientAuthenticationMethods))
				.authorizationGrantTypes(StringUtils.collectionToCommaDelimitedString(authorizationGrantTypes))
				.redirectUris(StringUtils.collectionToCommaDelimitedString(registeredClient.getRedirectUris()))
				.scopes(StringUtils.collectionToCommaDelimitedString(registeredClient.getScopes()))
				.clientSettings(writeMap(registeredClient.getClientSettings().getSettings()))
				.tokenSettings(writeMap(registeredClient.getTokenSettings().getSettings()))
		.build();

		if(!Objects.equals(clientEntity, null)) {
			entity.setClientRoles(clientEntity.getClientRoles());
		}else {
			entity.setClientRoles(new HashSet<ClientRoleEntity>());
		}
		
		return entity;
	}

	private Map<String, Object> parseMap(String data) {
		try {
			return this.objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {
			});
		} catch (Exception ex) {
			throw new IllegalArgumentException(ex.getMessage(), ex);
		}
	}

	private String writeMap(Map<String, Object> data) {
		try {
			return this.objectMapper.writeValueAsString(data);
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

	private static ClientAuthenticationMethod resolveClientAuthenticationMethod(String clientAuthenticationMethod) {
		if (ClientAuthenticationMethod.CLIENT_SECRET_BASIC.getValue().equals(clientAuthenticationMethod)) {
			return ClientAuthenticationMethod.CLIENT_SECRET_BASIC;
		} else if (ClientAuthenticationMethod.CLIENT_SECRET_POST.getValue().equals(clientAuthenticationMethod)) {
			return ClientAuthenticationMethod.CLIENT_SECRET_POST;
		} else if (ClientAuthenticationMethod.NONE.getValue().equals(clientAuthenticationMethod)) {
			return ClientAuthenticationMethod.NONE;
		}
		return new ClientAuthenticationMethod(clientAuthenticationMethod);      // Custom client authentication method
	}


}