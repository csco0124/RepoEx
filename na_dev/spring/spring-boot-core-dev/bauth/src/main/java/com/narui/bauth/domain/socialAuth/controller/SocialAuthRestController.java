package com.narui.bauth.domain.socialAuth.controller;

import java.io.IOException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.bauth.domain.socialAuth.service.SocialAuthService;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SocialAuthRestController {
	
	@Autowired
	private final PrincipalUtil principalUtil;
	@Autowired
	private final SocialAuthService socialAuthService;
	
	@Operation(summary = "현재 유저에게 등록된 socialKey 조회")
	@GetMapping(value="/private/api/social/key")
	public ResponseEntity<ApiResponse<UserDto.registeredAuthKey>> selectSocialKey(HttpServletRequest request) {
		MultiFactorUserDetails user = (MultiFactorUserDetails) principalUtil.getPrincipal();
		UserEntity userInfo = socialAuthService.selectSocialKey(user.getEmail());
		
		HttpSession session = request.getSession();
		session.setAttribute("userEmail", userInfo.getEmail());

		UserDto.registeredAuthKey socialKeys = UserDto.registeredAuthKey.builder()
												.kakaoKey(userInfo.getKakaoKey())
												.naverKey(userInfo.getNaverKey())
												.googleKey(userInfo.getGoogleKey())
											.build();
		return ApiResponse.toOkResponseEntity(socialKeys);
	}
	
	@Operation(summary = "현재 유저에게 등록 된 socialKey 제거(social key값을 Null로 변경)")
	@PutMapping(value="/private/api/social/key/{social}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteSocialKey(@PathVariable String social){
		MultiFactorUserDetails userInfo = (MultiFactorUserDetails) principalUtil.getPrincipal();
		
		socialAuthService.deleteSocialKey(social, userInfo.getEmail());
		
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "소셜로그인 시 remember me 판단해서 쿠키 등록")
	@GetMapping(value = "/public/api/social/login/{social}")
    public void socialLogin(@PathVariable(value = "social") @Pattern(regexp = "^(kakao|naver|google)$") String social, 
    		@RequestParam(value = "rememberMe", required = false) String rememberMe, HttpServletResponse response) throws IOException {
		final String url = "/oauth2/authorization/" + social;
		final String rememberMeValue = "on";
		if(!Objects.isNull(rememberMe)) {
			if(rememberMeValue.equals(rememberMe)) {
				Cookie cookie = new Cookie("remember-me", rememberMe);
				cookie.setPath("/");
				response.addCookie(cookie);
			}
		}
		System.out.println(url);
		response.sendRedirect(url);
    }
}
