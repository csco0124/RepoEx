package com.narui.bauth.global.util;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;

@Component
public class PrincipalUtil {
	public PrincipalUtil() {
	}
	
	public SecurityContext getContext() {
		return SecurityContextHolder.getContext();
	}
	
	/*
	 * 만약 principal의 data type이 defaultOAuth2User이라면 MultiFactorUserDetails로 convert한 뒤
	 * UserDetails 형태로 return
	 */
	public UserDetails getPrincipal() {
		Authentication authentication = getContext().getAuthentication();
		return principalConvert(authentication);
	}
	
	/*
	 * SecurityContextHolder.getContext().getAuthentication() 형태로 값을 가져오는게 아닌 로직은 authentication를 파라미터로 넣어줌
	 */
	public UserDetails getPrincipal(Authentication authentication) {
		return principalConvert(authentication);
	}
	
	private UserDetails principalConvert(Authentication authentication) {
		Object principal =  authentication.getPrincipal();
    	
    	List<? extends GrantedAuthority> authorities = (List<? extends GrantedAuthority>) authentication.getAuthorities();
    	
		MultiFactorUserDetails userPrincipal = null;
		if(Objects.equals(principal, "anonymousUser")) {
			userPrincipal = null;
		}
		else if(principal instanceof DefaultOAuth2User) {
    		DefaultOAuth2User oAuthUser = (DefaultOAuth2User) principal;
        	Map<String, Object> mapUser = oAuthUser.getAttributes();
			userPrincipal = MultiFactorUserDetails.builder()
	    			.accountNonExpired((Boolean) mapUser.get("accountNonExpired"))
	    			.accountNonLocked((Boolean) mapUser.get("accountNonLocked"))
	    			.authorities(authorities)
	    			.credentialsNonExpired((Boolean) mapUser.get("credentialsNonExpired"))
	    			.email(convertString(mapUser.get("email")))
	    			.enabled((Boolean) mapUser.get("enabled"))
	    			.id((Long)mapUser.get("id"))
	    			.kakaoKey(convertString(mapUser.get("kakaoKey")))
	    			.naverKey(convertString(mapUser.get("naverKey")))
	    			.googleKey(convertString(mapUser.get("googleKey")))
	    			.lastChallenge((Timestamp)mapUser.get("lastChallenge"))
	    			.nickname(convertString(mapUser.get("nickname")))
	    			.password(convertString(mapUser.get("password")))
	    			.phone(convertString(mapUser.get("phone")))
	    			.secret(convertString(mapUser.get("secret")))
	    			.using2FA((Boolean)mapUser.get("using2FA"))
	    	.build();
        }else {
        	userPrincipal = (MultiFactorUserDetails) principal;
        }
    	
    	return userPrincipal;
	}
	
	private String convertString(Object value) {
		if(Objects.equals(value, null)) {
			return null;
		}
		
		return value.toString();
	}
	
}
