package com.narui.bauth.global.webauthn.authentication;

import com.webauthn4j.data.PublicKeyCredentialDescriptor;
import com.webauthn4j.data.PublicKeyCredentialType;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.challenge.ChallengeRepository;
import com.webauthn4j.springframework.security.exception.PrincipalNotFoundException;
import com.webauthn4j.springframework.security.options.AssertionOptionsProviderImpl;
import com.webauthn4j.springframework.security.options.RpIdProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class MultiFactorAssertionOptionsProviderImpl extends AssertionOptionsProviderImpl {

    public MultiFactorAssertionOptionsProviderImpl(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService authenticatorService, ChallengeRepository challengeRepository) {
        super(rpIdProvider, authenticatorService, challengeRepository);
    }

    /*  
     *   loadAuthenticatorsByUserPrincipal(authentication.getName()) 
     *   =>  MultiFactorUserDetails
     *   loadAuthenticatorsByUserPrincipal(email)
     */
    @Override
    protected List<PublicKeyCredentialDescriptor> getCredentials(Authentication authentication) {
        
        String email = null;
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (servletRequestAttributes != null) {
            HttpServletRequest req = servletRequestAttributes.getRequest(); 
            email = req.getParameter("email");        
        }        

        if (authentication == null && !StringUtils.hasText(email)) {
            return Collections.emptyList();
        }

        try {
            return getAuthenticatorService().loadAuthenticatorsByUserPrincipal(email).stream()
                    .map(authenticator -> new PublicKeyCredentialDescriptor(PublicKeyCredentialType.PUBLIC_KEY, authenticator.getAttestedCredentialData().getCredentialId(), authenticator.getTransports()))
                    .collect(Collectors.toList());
        } catch (PrincipalNotFoundException e) {
            return Collections.emptyList();
        }
    }
}
