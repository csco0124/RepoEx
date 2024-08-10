package com.narui.bauth.domain.profile.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.verifySocial.entity.VerifySocialEntity;
import com.narui.bauth.domain.verifySocial.repository.VerifySocialRepository;
import com.narui.bauth.domain.webauthn.dto.AuthenticatorForm;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.webauthn.util.AuthenticatorSpecificMapper;
import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;
import com.webauthn4j.data.attestation.AttestationObject;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidationResponse;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidator;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticator;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorImpl;
import com.webauthn4j.springframework.security.exception.WebAuthnAuthenticationException;
import com.webauthn4j.util.exception.WebAuthnException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProfileService {

	private final UserRepository userRepository;
	
	private final AuthenticatorSpecificMapper specificMapper;
	
	private final WebAuthnRegistrationRequestValidator registrationRequestValidator;
	
	private final VerifySocialRepository verifySocialRepository;
	
	public ProfileService(UserRepository userRepository, AuthenticatorSpecificMapper specificMapper,
			WebAuthnRegistrationRequestValidator registrationRequestValidator, VerifySocialRepository verifySocialRepository) {
		this.userRepository = userRepository;
		this.specificMapper = specificMapper;
		this.registrationRequestValidator = registrationRequestValidator;
		this.verifySocialRepository = verifySocialRepository;
	}
	
	@Transactional
	public UserEntity save(Long id, UserDto.ProfileForm profileForm) {
		// FIX : findById의 경우 LAZY 오류발생
		return userRepository.findWithAuthenticatorsById(id).map(userEntity -> {
			UserEntity updateUser = specificMapper.mapForUpdate(profileForm, userEntity);
			updateUser.getAuthenticators().forEach(authenticatorEntity -> authenticatorEntity.setUser(userEntity));
			userRepository.save(updateUser);
			return updateUser;
		}).orElseThrow(()-> {
			throw new ApiException("저장오류");
		});
	}

	@Transactional
	public UserDto.ProfileForm webauthnSave(HttpServletRequest request, UserDto.ProfileForm profileForm, MultiFactorUserDetails user) {
		try {
			for (AuthenticatorForm authenticatorForm : profileForm.getAuthenticators()) {
				if (authenticatorForm.getId() != null) {
					continue;
				}
				WebAuthnRegistrationRequestValidationResponse validate = registrationRequestValidator.validate(
					request,
					authenticatorForm.getClientDataJSON(),
					authenticatorForm.getAttestationObject(),
					authenticatorForm.getTransports(),
					authenticatorForm.getClientExtensions()
				);
				
				AttestationObject attestationObject = validate.getAttestationObject();
				WebAuthnAuthenticator authenticator = new WebAuthnAuthenticatorImpl(
					authenticatorForm.getName(),
					user,
					attestationObject.getAuthenticatorData().getAttestedCredentialData(),
					attestationObject.getAttestationStatement(),
					attestationObject.getAuthenticatorData().getSignCount(),
					validate.getTransports(),
					validate.getRegistrationExtensionsClientOutputs(),
					attestationObject.getAuthenticatorData().getExtensions()
				);
				authenticatorForm.setWebAuthnAuthenticator(authenticator);
			}
		} catch (WebAuthnException | WebAuthnAuthenticationException e) {
			log.debug("WebAuthn registration request validation failed.", e);
		}
		UserEntity updateUserEntity = save(user.getId(), profileForm);
		return specificMapper.mapToProfileForm(updateUserEntity);
	}
	
	//에러 처리를 위해 transactional x
	public UserDto.ProfileForm annonymousUserSave(HttpServletRequest request, UserDto.WebauthnProfileForm webauthnProfileForm, Long verifySocialId){
		VerifySocialEntity verifySocialEntity = verifySocialRepository.findById(verifySocialId).orElse(null);
		LocalDateTime modifiedDate = verifySocialEntity.getModifiedDate();
		LocalDateTime now = LocalDateTime.now();
		
		if(!verifySocialEntity.isEnabled()) {
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
		}
		
		//인증을 완료한지 15분이 지났다면 에러 발생
		if(modifiedDate.isBefore(now.minusMinutes(15))) {
			annonymousException(verifySocialEntity, ErrorCode.CREDENTIALEXPIRED);
		}
		
		//파라미터의 이메일과 DB의 이메일이 같지 않으면 에러 발생
		if(!Objects.equals(webauthnProfileForm.getEmail(), verifySocialEntity.getEmail())) {
			annonymousException(verifySocialEntity, ErrorCode.PARAM_ERR);
		}
		
		if(!Objects.equals(verifySocialEntity.getSecretKey(), webauthnProfileForm.getSecretKey())) {
			annonymousException(verifySocialEntity, ErrorCode.PARAM_ERR);
		}
		
		UserEntity userEntity = userRepository.findWithAuthenticatorsByEmail(webauthnProfileForm.getEmail());
		
		List<SimpleGrantedAuthority> authorities = userEntity.getAuthorities().stream()
				.map(AuthorityEntity::getAuthority)
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		
		MultiFactorUserDetails user = MultiFactorUserDetails.builder()
				.id(userEntity.getId())
				.email(userEntity.getEmail())
				.using2FA(userEntity.isUsing2FA())
				.secret(userEntity.getSecret())
				.nickname(userEntity.getNickname())
				.password(userEntity.getPassword())
				.enabled(userEntity.isEnabled())
				.accountNonExpired(userEntity.isAccountNonExpired())
				.accountNonLocked(userEntity.isAccountNonLocked())
				.credentialsNonExpired(userEntity.isCredentialsNonExpired())
				.authorities(authorities)
				.build();
		
		UserDto.ProfileForm profileForm = UserDto.ProfileForm.builder()
				.userHandle(webauthnProfileForm.getUserHandle())
				.username(webauthnProfileForm.getUsername())
				.email(webauthnProfileForm.getEmail())
				.authenticators(webauthnProfileForm.getAuthenticators())
				.build();
		
		return webauthnSave(request, profileForm, user);
	}
	
	private void annonymousException(VerifySocialEntity verifySocialEntity, ErrorCode errorCode) {
		verifySocialEntity.updateEnabled(false);
		verifySocialRepository.save(verifySocialEntity);
		throw new ApiException(errorCode);
	}
}
