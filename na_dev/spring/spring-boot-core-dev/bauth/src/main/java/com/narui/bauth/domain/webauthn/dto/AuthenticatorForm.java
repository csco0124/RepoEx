package com.narui.bauth.domain.webauthn.dto;

import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticator;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class AuthenticatorForm {
    private Long id;

    private String credentialId;

    private String name;

    @NotNull
    @Valid
    private String clientDataJSON;

    @NotNull
    @Valid
    private String attestationObject;

    private Set<String> transports;

    @NotNull
    private String clientExtensions;

    private WebAuthnAuthenticator webAuthnAuthenticator;

    public AuthenticatorForm(Long id, String credentialId, String name) {
        this.id = id;
        this.credentialId = credentialId;
        this.name = name;
    }

    public AuthenticatorEntity toEntity() {
        AuthenticatorEntity entity = new AuthenticatorEntity();
        entity.setName(name);
        entity.setCounter(webAuthnAuthenticator.getCounter());
        entity.setTransports(webAuthnAuthenticator.getTransports());
        entity.setAttestedCredentialData(webAuthnAuthenticator.getAttestedCredentialData());
        entity.setAttestationStatement(webAuthnAuthenticator.getAttestationStatement());
        entity.setClientExtensions(webAuthnAuthenticator.getClientExtensions());
        entity.setAuthenticatorExtensions(webAuthnAuthenticator.getAuthenticatorExtensions());
        return entity;
    }
}
