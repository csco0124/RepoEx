package com.narui.bauth.domain.role.entity;

import java.io.Serializable;

import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "roles")
public class RoleEntity extends BaseTimeEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@NotNull
	@Size(max = 50)
	private String authority; // role명
	
	@NotNull
	@Size(max = 1)
	private String defaultYn; // default 여부

	@Builder
	public RoleEntity(
			@NotNull @Size(max = 50) String authority, 
			@NotNull @Size(max = 1) String defaultYn
	) {
		this.authority = authority;
		this.defaultYn = defaultYn;
	}
	
	public void setDefaultYn (boolean isDefault) {
		this.defaultYn = isDefault ? "Y" : "N";
	}
}