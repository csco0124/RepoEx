package com.narui.bauth.domain.socialAuth.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.stereotype.Service;

import com.narui.common.api.ErrorCode;

import jakarta.transaction.Transactional;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;

@Service
public class SocialAuthService {
	@Autowired
	private UserRepository userRepository;
	
	public UserEntity selectSocialAuth(String attributeId, String attributeName) {
		UserEntity userInfo = null;
		try {
			if("kakao".equals(attributeName)) {
				userInfo = userRepository.findWithAuthoritiesByKakaoKey(attributeId).orElse(null);
			}else if("naver".equals(attributeName)) {
				userInfo = userRepository.findWithAuthoritiesByNaverKey(attributeId).orElse(null);
			}else if("google".equals(attributeName)) {
				userInfo = userRepository.findWithAuthoritiesByGoogleKey(attributeId).orElse(null);
			}else {
				userInfo = null;
			}
		} catch (Exception e) {
			OAuth2Error oAuth2Error = new OAuth2Error(OAuth2ErrorCodes.ACCESS_DENIED);
			throw new OAuth2AuthenticationException(oAuth2Error, ErrorCode.FORBIDDEN.getErrCd());
		}
		
		return userInfo;
	}
	
	public boolean authIdValid(UserEntity userInfo, String attributeName) {
		if("kakao".equals(attributeName)) {
			return userInfo.getKakaoKey() == null;
		}else if("naver".equals(attributeName)) {
			return userInfo.getNaverKey() == null;
		}else if("google".equals(attributeName)) {
			return userInfo.getGoogleKey() == null;
		}
		
		return false;
	}
	
	public UserEntity updateSocialAuthAndReturn(String attributeName, String socialKey, UserEntity userInfo) {
		//UserEntity userEntity = userRepository.findWithAuthenticatorsById(userId).orElse(null);
		if(userInfo != null) {
			if("kakao".equals(attributeName)) {
				userInfo.updateKakaoKey(socialKey);
			}else if("naver".equals(attributeName)) {
				userInfo.updateNaverKey(socialKey);
			}else if("google".equals(attributeName)){
				userInfo.updateGoogleKey(socialKey);
			}

			userRepository.save(userInfo);
			
			return userInfo;
		}
		return null;
	}
	
	public String getAttributeId(Object value, String attributeName) {
		String attributeId = null;
		
		if(!Objects.equals(value, null)) {
			if("kakao".equals(attributeName)) {
				attributeId = value.toString();
			}else if("naver".equals(attributeName)) {
				Map<?, ?> theHash = (Map<?, ?>)value;
				Map<String, Object> valueMap = new HashMap<String, Object>();
				
				for( Map.Entry<?, ?> entry : theHash.entrySet()){
					valueMap.put( (String)entry.getKey(), (Object)entry.getValue() );
				}
				
				attributeId = valueMap.get("id").toString();
			}else if("google".equals(attributeName)){
				attributeId = value.toString();
			}
		}
		
		return attributeId;
	}
	
	public UserEntity selectSocialKey(String email) {
		return userRepository.findByEmail(email);
	}
	
	public void deleteSocialKey(String social, String email) {
		UserEntity user = userRepository.findByEmail(email);
		
		if("kakao".equals(social)) {
			user.updateKakaoKey(null);
		}else if("naver".equals(social)) {
			user.updateNaverKey(null);
		}else if("google".equals(social)) {
			user.updateGoogleKey(null);
		}
		
		userRepository.save(user);
	}
	
	@Transactional
	public List<? extends GrantedAuthority> mergeAuthorities(UserEntity userInfo){
		 List<String> userAuthorities = userInfo.getAuthorities().stream().map(authorityEntity -> {
			return authorityEntity.getAuthority();
		}).collect(Collectors.toList());

		//if(userInfo.getC)
		 
		//clientAuhtority 추가
		userInfo.getClientAuthorities().stream().forEach(clientAuthorityEntity -> {
			userAuthorities.add(clientAuthorityEntity.getClientRoleEntity().getAuthority());
		});
		
		//authorities Entity형에서 List<GrantedAuthority>로 변환
		List<? extends GrantedAuthority> authorities = userAuthorities.stream().map(userAuthority -> {
			//GrantedAuthority authority = new SimpleGrantedAuthority(authorityEntity.getAuthority());
			GrantedAuthority authority = new SimpleGrantedAuthority(userAuthority);
			return authority;
		}).collect(Collectors.toList());
		
		return authorities;
	}
}
