package com.narui.bauth.domain.clientAuthority.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Table(name="client_authority")
public class ClientAuthorityEntity extends BaseTimeEntity implements Serializable {

	// @NoArgsConstructor
	public ClientAuthorityEntity() {}
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_authority_seq")
	private Long id; // index 용도
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@NotNull
	@JsonIgnore
	@JoinColumn(name = "authority")
	private ClientRoleEntity clientRoleEntity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private UserEntity userEntity;

	@Builder
	public ClientAuthorityEntity(Long id, @NotNull ClientRoleEntity clientRoleEntity, @NotNull UserEntity userEntity) {
		this.id = id;
		this.clientRoleEntity = clientRoleEntity;
		this.userEntity = userEntity;
	}
	
}

