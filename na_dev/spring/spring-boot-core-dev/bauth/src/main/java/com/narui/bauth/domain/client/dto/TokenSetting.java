package com.narui.bauth.domain.client.dto;

import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TokenSetting {

    @Schema(description = "accessToken 유효시간")
    private long accessTokenTimeToLive;

    @Schema(description = "accessToken 포맷")
    private String accessTokenFormat;

    @Schema(description = "refreshToken 새로고침 표현 유무")
    private boolean reuseRefreshTokens;

    @Schema(description = "refreshToken 유효시간")
    private long refreshTokenTimeToLive;

    @Schema(description = "token 서명을 위한 JWS 알고리즘")
    private String idTokenSignatureAlgorithm;

    public TokenSetting(TokenSettings settings) {
        this.accessTokenTimeToLive = settings.getAccessTokenTimeToLive().toMinutes();
        this.accessTokenFormat = settings.getAccessTokenFormat().getValue();
        this.reuseRefreshTokens = settings.isReuseRefreshTokens();
        this.refreshTokenTimeToLive = settings.getRefreshTokenTimeToLive().toMinutes();
    }
}
