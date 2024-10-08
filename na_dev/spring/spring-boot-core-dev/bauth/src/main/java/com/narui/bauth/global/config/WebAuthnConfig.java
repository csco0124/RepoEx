/*
 * Copyright 2002-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.narui.bauth.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.cbor.CBORFactory;
import com.narui.bauth.global.webauthn.authentication.CustomAttestationOptionsProviderImpl;
import com.narui.bauth.global.webauthn.authentication.MultiFactorAssertionOptionsProviderImpl;
import com.webauthn4j.WebAuthnManager;
import com.webauthn4j.converter.util.ObjectConverter;
import com.webauthn4j.metadata.converter.jackson.WebAuthnMetadataJSONModule;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidator;
import com.webauthn4j.springframework.security.WebAuthnSecurityExpression;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.challenge.ChallengeRepository;
import com.webauthn4j.springframework.security.challenge.HttpSessionChallengeRepository;
import com.webauthn4j.springframework.security.converter.jackson.WebAuthn4JSpringSecurityJSONModule;
import com.webauthn4j.springframework.security.options.AssertionOptionsProvider;
import com.webauthn4j.springframework.security.options.AttestationOptionsProvider;
import com.webauthn4j.springframework.security.options.RpIdProvider;
import com.webauthn4j.springframework.security.options.RpIdProviderImpl;
import com.webauthn4j.springframework.security.server.ServerPropertyProvider;
import com.webauthn4j.springframework.security.server.ServerPropertyProviderImpl;

@Configuration
public class WebAuthnConfig {

    @Bean
    ObjectConverter objectConverter(){
        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new WebAuthnMetadataJSONModule());
        jsonMapper.registerModule(new WebAuthn4JSpringSecurityJSONModule());
        ObjectMapper cborMapper = new ObjectMapper(new CBORFactory());
        return new ObjectConverter(jsonMapper, cborMapper);
    }

    @Bean
    WebAuthnManager webAuthnManager(ObjectConverter objectConverter){
        return WebAuthnManager.createNonStrictWebAuthnManager(objectConverter);
    }

    @Bean
    WebAuthnSecurityExpression webAuthnSecurityExpression(){
        return new WebAuthnSecurityExpression();
    }

    @Bean
    ChallengeRepository challengeRepository() {
        return new HttpSessionChallengeRepository();
    }

    @Bean
    AttestationOptionsProvider attestationOptionsProvider(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService webAuthnAuthenticatorService, ChallengeRepository challengeRepository){
    	return new CustomAttestationOptionsProviderImpl(rpIdProvider, webAuthnAuthenticatorService, challengeRepository);
    }

    // MultiFactor
    @Bean
    AssertionOptionsProvider assertionOptionsProvider(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService webAuthnAuthenticatorService, ChallengeRepository challengeRepository) {
        return new MultiFactorAssertionOptionsProviderImpl(rpIdProvider, webAuthnAuthenticatorService, challengeRepository);
    }
    
    @Bean
    RpIdProvider rpIdProvider(){
        return new RpIdProviderImpl();
    }

    @Bean
    ServerPropertyProvider serverPropertyProvider(RpIdProvider rpIdProvider, ChallengeRepository challengeRepository){
        return new ServerPropertyProviderImpl(rpIdProvider, challengeRepository);
    }

    @Bean
    WebAuthnRegistrationRequestValidator webAuthnRegistrationRequestValidator(WebAuthnManager webAuthnManager, ServerPropertyProvider serverPropertyProvider){
        return new WebAuthnRegistrationRequestValidator(webAuthnManager, serverPropertyProvider);
    }

}
