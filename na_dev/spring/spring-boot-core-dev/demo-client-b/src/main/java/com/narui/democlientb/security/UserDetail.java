package com.narui.democlientb.security;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDetail implements UserDetails, OidcUser{
	private String username;
    private final Collection<? extends GrantedAuthority> authorities;
    private boolean isAuthenticated;
    private String password;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;
    private final Map<String, Object> attributes;
    private final OidcIdToken idToken;
    private final OidcUserInfo userInfo;
    private String nameAttributeKey;
    
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return username;
	}
	@Override
	public Map<String, Object> getClaims() {
		// TODO Auto-generated method stub
		return attributes;
	}
}
