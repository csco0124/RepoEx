package com.narui.bauth.domain.clientSettingInfo.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "client_setting_info")
@NoArgsConstructor
public class ClientSettingInfoEntity extends BaseTimeEntity implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@OneToOne
	@JoinColumn(name = "id")
	@MapsId
	@JsonIgnore
	private ClientEntity clientEntity;

	@Column(length = 255, name = "base_url")
	@Size(max = 255)
	private String baseUrl;

	@Column(length = 255, name = "home_uri")
	@Size(max = 255)
	private String homeUri;

	@Column(length = 255, name = "logo_uri")
	@Size(max = 255)
	private String logoUri;

	@Builder
	public ClientSettingInfoEntity(ClientEntity clientEntity, String baseUrl, String homeUri, String logoUri, String id) {
		this.id = id;
		this.clientEntity = clientEntity;
		this.baseUrl = baseUrl;
		this.homeUri = homeUri;
		this.logoUri = logoUri;
	}

	public void updateBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}
	public void updateHomeUri(String homeUri) {
		this.homeUri = homeUri;
	}
	public void updateLogoUri(String logoUri) {
		this.logoUri = logoUri;
	}

	public void updateClientEntity(ClientEntity clientEntity) {
		this.clientEntity = clientEntity;
	}
}
