package com.narui.bauth.global.oauth2.service;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.narui.common.api.ErrorCode;
import com.narui.bauth.domain.socialAuth.service.SocialAuthService;
import com.narui.bauth.domain.user.entity.PhoneEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService{
	private final HttpSession session;
	private final SocialAuthService socialAuthService;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		
		// 현재 진행중인 서비스를 구분하기 위해 문자열로 받음. oAuth2UserRequest.getClientRegistration().getRegistrationId()에 값이 들어있다. {registrationId='naver'} 이런식으로
		String attributeName = userRequest.getClientRegistration().getRegistrationId();
		
		//OAuth2 로그인 시 키 값이 된다. 구글은 키 값이 "sub"이고, 네이버는 "response"이고, 카카오는 "id"이다. 각각 다르므로 이렇게 따로 변수로 받아서 넣어줘야함.
		String attributeKey = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
		
		Map<String, Object> attributes = oAuth2User.getAttributes();
		String attributeId = socialAuthService.getAttributeId(attributes.get(attributeKey), attributeName);
		
		UserEntity socialUser = socialAuthService.selectSocialAuth(attributeId, attributeName);
		UserEntity userInfo = null;
		Object userEmail = session.getAttribute("userEmail");
		
		OAuth2Error oAuth2Error = new OAuth2Error(OAuth2ErrorCodes.ACCESS_DENIED);

		if(session.getAttribute("userEmail") == null) {	//소셜 로그인
			userInfo = socialUser;
		}else {											//소셜 등록
			userInfo = userRepository.findWithAuthoritiesByEmail(userEmail.toString());
			String socialKey = null;
			if("kakao".equals(attributeName)) {
				socialKey = userInfo.getKakaoKey();
			}
			if("naver".equals(attributeName)) {
				socialKey = userInfo.getNaverKey();
			}
			if("google".equals(attributeName)) {
				socialKey = userInfo.getGoogleKey();
			}
			//이미 소셜 등록이 되어있을 경우
			if(socialUser != null) {
				if((!Objects.equals(socialUser.getEmail(), userInfo.getEmail()))
						|| (Objects.equals(socialUser.getEmail(), userInfo.getEmail()) && attributeId.equals(socialKey))) {
					throw new OAuth2AuthenticationException(oAuth2Error, ErrorCode.USERALREADYEXIST.getErrCd());//1
				}
			}
			session.removeAttribute("userEmail");
		}
		//소셜 로그인 시 등록되지 않은 계정일 경우
		//CustomOauth2AuthenticationFailureHandler에서 redirect를 하기 위한 전용 customError가 필요함
		if(userInfo == null) {
			Map<String, String> socialMap = new HashMap<String, String>();
			socialMap.put("socialKey", attributeId);
			socialMap.put("socialName", attributeName);
			
			Map<String, Object> account = null;
			String email = null;
			if("kakao".equals(attributeName)) {
				account = oAuth2User.getAttribute("kakao_account");
			}
			if("naver".equals(attributeName)) {
				account = oAuth2User.getAttribute("response");
				log.info("account :: {}", account);
			}
			if("google".equals(attributeName)) {
				email = oAuth2User.getAttribute("email");
			}
			if(!Objects.equals(account, null) && Objects.equals(email, null)) {
				if(!Objects.equals(account.get("email"), null)) {
					email = account.get("email").toString();
				}
			}
			socialMap.put("socialEmail", email);
			
			session.setAttribute("socialMap", socialMap);
			throw new OAuth2AuthenticationException(oAuth2Error, "SOCIALREGISTRATION");
			//throw new OAuth2AuthenticationException(oAuth2Error, ErrorCode.USERNOTFOUND.getErrCd());//1
		}
		
		if(socialAuthService.authIdValid(userInfo, attributeName)) {
			userInfo = socialAuthService.updateSocialAuthAndReturn(attributeName, attributeId, userInfo);
		}
		
		List<? extends GrantedAuthority> authorities = socialAuthService.mergeAuthorities(userInfo);

		//UserEntity 형식의 정보를 Map<String, Object>으로 변환시키기 위해 toMap() 사용
		Map<String, Object> userInfoMap = new HashMap<>();
		try {
			userInfoMap = toMap(userInfo, authorities);
			if(userInfoMap != null) {
				userInfoMap.put("attributeName", attributeName);
			}
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		
		//return new DefaultOAuth2User( Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes, attributeKey);
		return new DefaultOAuth2User( authorities, userInfoMap, "email");
	}
	
	private static Map<String, Object> toMap(Object entity, List<? extends GrantedAuthority> authorities) throws IllegalAccessException {
		Map<String, Object> map = new HashMap<>();
		for (Field field : entity.getClass().getDeclaredFields()) {
			field.setAccessible(true);
			switch(field.getName()){
//				case "clientAuthorities" -> map.put(field.getName(), null);
				case "authenticators", "clientAuthorities" -> field.setAccessible(false);
				case "authorities" -> map.put(field.getName(), authorities);
				case "phone" -> {
					PhoneEntity phoneEntity = (PhoneEntity)field.get(entity);
					map.put(field.getName(), phoneEntity.getPhone());
				}
				default ->	map.put(field.getName(), field.get(entity));
			}
		}
		return map;
	}
}
