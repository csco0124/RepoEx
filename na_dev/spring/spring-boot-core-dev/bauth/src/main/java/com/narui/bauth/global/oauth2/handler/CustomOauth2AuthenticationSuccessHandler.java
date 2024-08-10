package com.narui.bauth.global.oauth2.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	private RequestCache requestCache = new HttpSessionRequestCache();
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		 SavedRequest savedRequest = this.requestCache.getRequest(request, response);
		 
		PrincipalUtil principalUtil = new PrincipalUtil();
		MultiFactorUserDetails principal = (MultiFactorUserDetails) principalUtil.getPrincipal();
		
		Cookie emailCookie = new Cookie("webauthnEmail", principal.getEmail());
		emailCookie.setPath("/");
		response.addCookie(emailCookie);

		if (savedRequest == null) {
			super.onAuthenticationSuccess(request, response, authentication);
			return;
		}
		
		String targetUrlParameter = getTargetUrlParameter();
		if (isAlwaysUseDefaultTargetUrl() || (targetUrlParameter != null
				&& StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
			this.requestCache.removeRequest(request, response);
			super.onAuthenticationSuccess(request, response, authentication);
			return;
		}
		
		clearAuthenticationAttributes(request);
		getRedirectStrategy().sendRedirect(request, response, savedRequest.getRedirectUrl());
	}
}
