package com.narui.bauth.domain.client.entity;

import java.time.Instant;
import java.util.Set;

import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "oauth2_registered_client")
public class ClientEntity {

	@Id
	private String id;

	private String clientId;

	private Instant clientIdIssuedAt;

	private String clientSecret;

	private Instant clientSecretExpiresAt;

	private String clientName;

	private String owner;

	@Column(length = 1000)
	private String clientAuthenticationMethods;

	@Column(length = 1000)
	private String authorizationGrantTypes;

	@Column(length = 1000)
	private String redirectUris;

	@Column(length = 1000)
	private String scopes;

	@Column(length = 2000)
	private String clientSettings;

	@Column(length = 2000)
	private String tokenSettings;

	@OneToMany(mappedBy = "clientEntity", cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<ClientRoleEntity> clientRoles;

	@OneToOne(mappedBy = "clientEntity", cascade = CascadeType.ALL , orphanRemoval = true)
	private ClientSettingInfoEntity clientSettingInfo;

	public void addClienRole(ClientRoleEntity clientRoleEntity) {
		this.clientRoles.add(clientRoleEntity);
	}

	public void removeClientsRole(ClientRoleEntity clientRoleEntity) {
		this.clientRoles.remove(clientRoleEntity);
	}

	public void updateClientSettingInfo(ClientSettingInfoEntity clientSettingInfoEntity) {
		this.clientSettingInfo = clientSettingInfoEntity;
	}

}