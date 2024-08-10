package com.narui.bauth.global.webauthn.authentication;

import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.webauthn4j.data.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticator;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MultiFactorWebAuthnAuthenticator implements WebAuthnAuthenticator {
	private static final long serialVersionUID = 1L;

	private MultiFactorUserDetails user;

    private AttestedCredentialData attestedCredentialData;

    private long counter;

    public MultiFactorWebAuthnAuthenticator(MultiFactorUserDetails user, AttestedCredentialData attestedCredentialData, long counter) {
        this.user = user;
        this.attestedCredentialData = attestedCredentialData;
        this.counter = counter;
    }

    @Override
    public Object getUserPrincipal() {
        return user;
    }
}
