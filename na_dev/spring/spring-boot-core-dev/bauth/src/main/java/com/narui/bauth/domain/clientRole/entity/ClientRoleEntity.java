package com.narui.bauth.domain.clientRole.entity;

import java.io.Serializable;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "client_roles")
public class ClientRoleEntity extends BaseTimeEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@NotNull
	@Size(max = 50)
	private String authority; // role명
	
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
//	@JsonIgnore
	@JoinColumn(name = "oauth2_registered_client_id")
	private ClientEntity clientEntity;
	
	@NotNull
	@Size(max = 1)
	private String defaultYn; // default 여부

	@Builder
	public ClientRoleEntity(
			@NotNull @Size(max = 20) String authority, 
			@NotNull ClientEntity clientEntity,
			@NotNull @Size(max = 1) String defaultYn
	) {
		this.authority = authority;
		this.clientEntity = clientEntity;
		this.defaultYn = defaultYn;
	}
	
	public void updateAuthority(String authority) {
		  this.authority = authority;
	  }
	
}