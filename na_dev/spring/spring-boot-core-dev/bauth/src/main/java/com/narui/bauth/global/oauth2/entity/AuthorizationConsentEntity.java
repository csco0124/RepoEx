package com.narui.bauth.global.oauth2.entity;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "`oauth2_authorization_consent`")
@IdClass(AuthorizationConsentEntity.AuthorizationConsentId.class)
public class AuthorizationConsentEntity {
    
	@Id
	private String registeredClientId;
	@Id
	private String principalName;
	@Column(length = 1000)
	private String authorities;

	public static class AuthorizationConsentId implements Serializable {
		private static final long serialVersionUID = 1L;
		
		private String registeredClientId;
		private String principalName;

		@Override
		public boolean equals(Object o) {
			if (this == o) return true;
			if (o == null || getClass() != o.getClass()) return false;
			AuthorizationConsentId that = (AuthorizationConsentId) o;
			return registeredClientId.equals(that.registeredClientId) && principalName.equals(that.principalName);
		}

		@Override
		public int hashCode() {
			return Objects.hash(registeredClientId, principalName);
		}
	}
}