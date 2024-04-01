package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDto {
	private String grantType; // JWT에 대한 인증 타입. 여기서는 Bearer를 사용한다. 이후 HTTP 헤더에 prefix로 붙여주는 타입
    private String accessToken;
    private String refreshToken;
}
