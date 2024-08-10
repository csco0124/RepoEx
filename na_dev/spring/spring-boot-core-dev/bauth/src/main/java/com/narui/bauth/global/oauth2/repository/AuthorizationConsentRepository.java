package com.narui.bauth.global.oauth2.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.global.oauth2.entity.AuthorizationConsentEntity;

public interface AuthorizationConsentRepository extends JpaRepository<AuthorizationConsentEntity, AuthorizationConsentEntity.AuthorizationConsentId> {
    
	Optional<AuthorizationConsentEntity> findByRegisteredClientIdAndPrincipalName(String registeredClientId, String principalName);
	void deleteByRegisteredClientIdAndPrincipalName(String registeredClientId, String principalName);
}