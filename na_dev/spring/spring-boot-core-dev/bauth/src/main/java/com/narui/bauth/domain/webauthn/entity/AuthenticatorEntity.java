package com.narui.bauth.domain.webauthn.entity;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.webauthn.util.jpa.converter.*;
import com.webauthn4j.data.AuthenticatorTransport;
import com.webauthn4j.data.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.data.attestation.statement.AttestationStatement;
import com.webauthn4j.data.extension.authenticator.AuthenticationExtensionsAuthenticatorOutputs;
import com.webauthn4j.data.extension.authenticator.RegistrationExtensionAuthenticatorOutput;
import com.webauthn4j.data.extension.client.AuthenticationExtensionsClientOutputs;
import com.webauthn4j.data.extension.client.RegistrationExtensionClientOutput;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticator;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Convert;
import jakarta.persistence.Converts;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "webauthn_authenticator")
public class AuthenticatorEntity implements WebAuthnAuthenticator {
	
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @NotNull // FK
    @JoinColumn(name = "user_id") // FK
    private UserEntity user;

    private long counter;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "m_transport", joinColumns = @JoinColumn(name = "authenticator_id"))
    @Column(name = "transport")
    @Convert(converter = AuthenticatorTransportConverter.class)
    private Set<AuthenticatorTransport> transports;
 
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "aaguid", column = @Column(name = "aaguid", columnDefinition = "blob")),
            @AttributeOverride(name = "credentialId", column = @Column(name = "credential_id", columnDefinition = "blob")),
            @AttributeOverride(name = "coseKey", column = @Column(name = "cose_key", columnDefinition = "blob"))
    })
    @Converts({
            @Convert(converter = AAGUIDConverter.class, attributeName = "aaguid"),
            @Convert(converter = COSEKeyConverter.class, attributeName = "coseKey")
    })
    private AttestedCredentialData attestedCredentialData;

    @Lob
    @Convert(converter = AttestationStatementConverter.class)
    private AttestationStatement attestationStatement;

    @Lob
    @Convert(converter = ClientExtensionsConverter.class)
    private AuthenticationExtensionsClientOutputs<RegistrationExtensionClientOutput> clientExtensions;

    @Lob
    @Convert(converter = AuthenticatorExtensionsConverter.class)
    private AuthenticationExtensionsAuthenticatorOutputs<RegistrationExtensionAuthenticatorOutput> authenticatorExtensions;

    @Override
    public Object getUserPrincipal() {
        return getUser();
    }
}
