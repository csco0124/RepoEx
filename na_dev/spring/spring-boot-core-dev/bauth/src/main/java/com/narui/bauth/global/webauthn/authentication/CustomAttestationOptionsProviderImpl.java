package com.narui.bauth.global.webauthn.authentication;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import com.narui.bauth.domain.verifySocial.entity.VerifySocialEntity;
import com.narui.bauth.domain.verifySocial.repository.VerifySocialRepository;
import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;
import com.webauthn4j.data.PublicKeyCredentialRpEntity;
import com.webauthn4j.data.PublicKeyCredentialUserEntity;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.challenge.ChallengeRepository;
import com.webauthn4j.springframework.security.exception.PrincipalNotFoundException;
import com.webauthn4j.springframework.security.options.AttestationOptions;
import com.webauthn4j.springframework.security.options.AttestationOptionsProviderImpl;
import com.webauthn4j.springframework.security.options.RpIdProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * An {@link AttestationOptionsProviderImpl} override
 */
public class CustomAttestationOptionsProviderImpl extends AttestationOptionsProviderImpl {

	@Autowired
	private VerifySocialRepository verifySocialRepository;
	@Autowired
	private HttpSession session;
	
	public CustomAttestationOptionsProviderImpl(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService authenticatorService, ChallengeRepository challengeRepository) {
		super(rpIdProvider, authenticatorService, challengeRepository);
	}
	
	public CustomAttestationOptionsProviderImpl(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService authenticatorService, ChallengeRepository challengeRepository
			, VerifySocialRepository verifySocialRepository, HttpSession session) {
		super(rpIdProvider, authenticatorService, challengeRepository);
		this.verifySocialRepository = verifySocialRepository;
		this.session = session;
	}

	@Override
	public AttestationOptions getAttestationOptions(HttpServletRequest request, Authentication authentication) {
		PublicKeyCredentialRpEntity relyingParty = new PublicKeyCredentialRpEntity(getCustomRpId(request), getRpName());
		PublicKeyCredentialUserEntity user;
		try {
			user = getPublicKeyCredentialUserEntityProvider().provide(authentication);
		} catch (PrincipalNotFoundException e) {
			user = null;
		}
		
		if(Objects.equals(user, null)) {
			Long verifySocialId = (Long)session.getAttribute("verifyKey");
			VerifySocialEntity verifySocialEntity = verifySocialRepository.findById(verifySocialId).orElse(null);
			if(verifySocialEntity != null) {
				if(!verifySocialEntity.isEnabled()) {
					throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
				}
				
				String username = verifySocialEntity.getEmail();
				
				user = new PublicKeyCredentialUserEntity(
						username.getBytes(StandardCharsets.UTF_8),
						username,
						username
				);
			}
		}
		
		return new AttestationOptions(
				relyingParty,
				user,
				getChallengeRepository().loadOrGenerateChallenge(request),
				getPubKeyCredParams(),
				getRegistrationTimeout(),
				getCredentials(authentication),
				getRegistrationAuthenticatorSelection(),
				getAttestation(),
				getRegistrationExtensionsProvider().provide(request));
	}

	String getCustomRpId(HttpServletRequest request) {
		RpIdProvider rpIdProvider = getRpIdProvider();
		if(rpIdProvider != null){
			return rpIdProvider.provide(request);
		}
		else {
			return getRpId();
		}
	}
}
