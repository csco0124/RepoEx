package com.narui.bauth.global.webauthn.authentication;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;
import com.narui.bauth.domain.webauthn.repository.AuthenticatorEntityRepository;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticator;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.exception.CredentialIdNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class MultiFactorWebAuthnAuthenticatorService implements WebAuthnAuthenticatorService {

    private final AuthenticatorEntityRepository authenticatorEntityRepository;

    private final UserRepository userRepository;

    public MultiFactorWebAuthnAuthenticatorService(AuthenticatorEntityRepository authenticatorEntityRepository,
                                           UserRepository userRepository) {
        this.authenticatorEntityRepository = authenticatorEntityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void updateCounter(byte[] credentialId, long counter) throws CredentialIdNotFoundException {
        AuthenticatorEntity authenticatorEntity =
                authenticatorEntityRepository.findByAttestedCredentialData_CredentialId(credentialId)
                        .orElseThrow(() -> new CredentialIdNotFoundException("AuthenticatorEntity not found"));
        authenticatorEntity.setCounter(counter);
    }

    @Override
    public WebAuthnAuthenticator loadAuthenticatorByCredentialId(byte[] credentialId) throws CredentialIdNotFoundException {
        return authenticatorEntityRepository.findByAttestedCredentialData_CredentialId(credentialId)
                .map(entity ->
                        new MultiFactorWebAuthnAuthenticator(
                                this.toMultiFactorUserDetails(entity.getUser()),
                                entity.getAttestedCredentialData(),
                                entity.getCounter())
                )
                .orElseThrow(() -> new CredentialIdNotFoundException("AuthenticatorEntity not found"));
    }

    @Override
    public List<WebAuthnAuthenticator> loadAuthenticatorsByUserPrincipal(Object principal) {
        String username = (String) principal;

        UserEntity userEntity = userRepository.findWithAuthenticatorsByEmail(username);
        Set<AuthenticatorEntity> authenticatorEntity = userEntity.getAuthenticators();        

        return authenticatorEntity.stream()
                .map(entity ->
                        new MultiFactorWebAuthnAuthenticator(toMultiFactorUserDetails(userEntity),
                                entity.getAttestedCredentialData(),
                                entity.getCounter()))
                .collect(Collectors.toList());
    }

    private MultiFactorUserDetails toMultiFactorUserDetails(UserEntity user) {
        List<String> userAuthorities = user.getAuthorities().stream()
                .map(AuthorityEntity::getAuthority)
                .collect(Collectors.toList());
        
    	//clientAuhtority 추가
    	user.getClientAuthorities().stream().forEach(
    			clientAuthorityEntity -> userAuthorities.add(clientAuthorityEntity.getClientRoleEntity().getAuthority())
    	);

    	// @formatter:off          
        List<SimpleGrantedAuthority> authorities = userAuthorities.stream()
    			.map(SimpleGrantedAuthority::new)
    			.collect(Collectors.toList());
        
        return MultiFactorUserDetails.builder()
                .id(user.getId())
                .email(user.getEmail())
                .using2FA(user.isUsing2FA())
                .secret(user.getSecret())
                .nickname(user.getNickname())
                .password(user.getPassword())
                .enabled(user.isEnabled())
                .accountNonExpired(user.isAccountNonExpired())
                .accountNonLocked(user.isAccountNonLocked())
                .credentialsNonExpired(user.isCredentialsNonExpired())
                .authorities(authorities)
                .build();
    }
}
