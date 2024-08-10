package com.narui.bauth.global.oauth2.mixin;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetailsDeserializer;

/** 
 * Deserialize 오류 수정
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY,
        getterVisibility = JsonAutoDetect.Visibility.NONE,
        isGetterVisibility = JsonAutoDetect.Visibility.NONE)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonDeserialize(using = MultiFactorUserDetailsDeserializer.class)
public abstract class MultiFactorUserDetailsMixin {
}
