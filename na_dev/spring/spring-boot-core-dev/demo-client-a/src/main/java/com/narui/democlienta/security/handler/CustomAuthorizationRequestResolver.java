package com.narui.democlienta.security.handler;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

public class CustomAuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver{
	
	private OAuth2AuthorizationRequestResolver defaultResolver;
	
	@Autowired
	private HttpSession session;
    @Value("${server-url}")
    private String serverUrl;
	
    public CustomAuthorizationRequestResolver(
      ClientRegistrationRepository repo, String authorizationRequestBaseUri) {
        defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(repo, authorizationRequestBaseUri);
    }
    
	@Override
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
        OAuth2AuthorizationRequest req = defaultResolver.resolve(request);
        if(req == null) {
        	return null;
        }
        setReferer(request);
        
        return req;
    }

    @Override
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
        OAuth2AuthorizationRequest req = defaultResolver.resolve(request, clientRegistrationId);
        if(req == null) {
        	return null;
        }
        setReferer(request);
        
        return req;
    }
    
    private void setReferer(HttpServletRequest request) {
    	String referer = request.getHeader("referer").toString();
        if(referer.contains(serverUrl) && Objects.equals(session.getAttribute("referer"), null)) {
        	session.setAttribute("referer", referer);
        }
    }

}
