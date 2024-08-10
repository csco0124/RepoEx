package com.narui.democlienta.security.service;

import com.narui.democlienta.security.UserDetail;
import com.nimbusds.jose.shaded.json.JSONArray;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class OAuth2OidcUserService extends OidcUserService {
	
	@Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUserInfo userInfo = null;
        OidcUser oidcUser = super.loadUser(userRequest);
        JSONArray roles = oidcUser.getClaim("roles");

        Set<GrantedAuthority> authorities = new LinkedHashSet<>();
        roles.stream().forEach((role) -> {
        	GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.toString());
        	authorities.add(authority);
        });

        
        return UserDetail.builder()
        		.authorities(authorities)
        		.userInfo(userInfo)
        		.idToken(userRequest.getIdToken())
        		.attributes(oidcUser.getAttributes())
        		.username(oidcUser.getUserInfo().getClaims().get("name").toString())
        	.build();
    }

    private Map<String, Object> collectClaims(OidcIdToken idToken, OidcUserInfo userInfo) {
        Assert.notNull(idToken, "idToken cannot be null");
        Map<String, Object> claims = new HashMap<>();
        if (userInfo != null) {
            claims.putAll(userInfo.getClaims());
        }
        claims.putAll(idToken.getClaims());
        return claims;
    }
}
