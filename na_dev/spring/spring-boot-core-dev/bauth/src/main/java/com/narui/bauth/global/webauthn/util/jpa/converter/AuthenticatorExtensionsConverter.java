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

package com.narui.bauth.global.webauthn.util.jpa.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.webauthn4j.converter.util.CborConverter;
import com.webauthn4j.converter.util.ObjectConverter;
import com.webauthn4j.data.extension.authenticator.AuthenticationExtensionsAuthenticatorOutputs;
import com.webauthn4j.data.extension.authenticator.RegistrationExtensionAuthenticatorOutput;
import com.webauthn4j.util.Base64UrlUtil;
import jakarta.persistence.AttributeConverter;


public class AuthenticatorExtensionsConverter implements
        AttributeConverter<AuthenticationExtensionsAuthenticatorOutputs<RegistrationExtensionAuthenticatorOutput>, String> {

    private final CborConverter cborConverter;

    public AuthenticatorExtensionsConverter(ObjectConverter objectConverter) {
        this.cborConverter = objectConverter.getCborConverter();
    }

    @Override
    public String convertToDatabaseColumn(
            AuthenticationExtensionsAuthenticatorOutputs<RegistrationExtensionAuthenticatorOutput> attribute) {
        return Base64UrlUtil.encodeToString(cborConverter.writeValueAsBytes(attribute));
    }

    @Override
    public AuthenticationExtensionsAuthenticatorOutputs<RegistrationExtensionAuthenticatorOutput> convertToEntityAttribute(
            String dbData) {
        if (dbData == null) {
            return null;
        }
        return cborConverter.readValue(Base64UrlUtil.decode(dbData),
                new TypeReference<AuthenticationExtensionsAuthenticatorOutputs<RegistrationExtensionAuthenticatorOutput>>() {});
    }
}
