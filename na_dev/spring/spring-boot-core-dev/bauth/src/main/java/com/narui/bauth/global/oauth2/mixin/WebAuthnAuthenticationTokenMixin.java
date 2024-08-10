package com.narui.bauth.global.oauth2.mixin;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.narui.bauth.global.webauthn.authentication.WebAuthnAuthenticationTokenDeserializer;

/** 
 * Deserialize 오류 수정
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE,
        isGetterVisibility = JsonAutoDetect.Visibility.NONE)
@JsonDeserialize(using = WebAuthnAuthenticationTokenDeserializer.class)
public abstract class WebAuthnAuthenticationTokenMixin {
}
