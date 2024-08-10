package com.narui.bauth.domain.client.dto;

import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClientSetting {

    @Schema(description = "클라이언트 인증 키 및 확인자 제공 여부")
    private boolean requireProofKey;

    @Schema(description = "클라이언트 액세스 요청 시 인증동의 여부")
    private boolean requireAuthorizationConsent;

    @Schema(description = "알고리즘 키세트 조회 URL")
    private String jwkSetUrl;

    public ClientSetting(ClientSettings settings) {
        this.requireProofKey = settings.isRequireProofKey();
        this.requireAuthorizationConsent = settings.isRequireAuthorizationConsent();
        this.jwkSetUrl = settings.getJwkSetUrl();
    }
}
