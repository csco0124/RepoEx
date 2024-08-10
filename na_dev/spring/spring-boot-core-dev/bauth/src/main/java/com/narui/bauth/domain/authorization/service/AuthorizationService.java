package com.narui.bauth.domain.authorization.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.global.oauth2.repository.AuthorizationRepository;

@Service
public class AuthorizationService {
	private final AuthorizationRepository authorizationRepository;
	
	public AuthorizationService(AuthorizationRepository authorizationRepository) {
		this.authorizationRepository = authorizationRepository;
	}
	
	@Transactional
	public void deleteAuthorization(String deleteDate){
		authorizationRepository.deleteByAccessTokenExpiresAt(deleteDate);
		optimizeAuthorization();
	}
	
	@Transactional
	private void optimizeAuthorization() {
		authorizationRepository.optimizeOauth2Authorization();
	}
}
