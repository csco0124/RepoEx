package com.narui.bauth.global.rememberMe.service;

import org.springframework.core.log.LogMessage;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomRememberMeServices extends PersistentTokenBasedRememberMeServices{
	private Boolean alwaysRemember = false;
	
	public CustomRememberMeServices(String key, UserDetailsService userDetailsService,
			PersistentTokenRepository tokenRepository, String parameter
			, String cookieName, String rememberMeCookieDomain, 
			Integer tokenValiditySeconds, Boolean useSecureCookie, Boolean alwaysRemember) {
		super(key, userDetailsService, tokenRepository);
		if (parameter != null) {
			setParameter(parameter);
		}
		if (parameter != null) {
			setCookieName(cookieName);
		}
		if (rememberMeCookieDomain != null) {
			setCookieDomain(rememberMeCookieDomain);
		}
		if (tokenValiditySeconds != null) {
			setTokenValiditySeconds(tokenValiditySeconds);
		}
		if (useSecureCookie != null) {
			setUseSecureCookie(useSecureCookie);
		}
		if (alwaysRemember != null) {
			this.alwaysRemember = alwaysRemember;
			setAlwaysRemember(alwaysRemember);
		}
	}
	
	@Override
	protected boolean rememberMeRequested(HttpServletRequest request, String parameter) {
		if (this.alwaysRemember) {
			return true;
		}
		
		String rememberMeParameter = getParameter();
		
		//custom
		String paramValue = request.getParameter(rememberMeParameter);
		String sessionParam = getCookie(request.getCookies(), rememberMeParameter);
		if(sessionParam != null) {
			paramValue = sessionParam;
		}
		
		if (paramValue != null) {
			if (paramValue.equalsIgnoreCase("true") || paramValue.equalsIgnoreCase("on")
					|| paramValue.equalsIgnoreCase("yes") || paramValue.equals("1")) {
				return true;
			}
		}
		this.logger.debug(
				LogMessage.format("Did not send remember-me cookie (principal did not set parameter '%s')", parameter));
		return false;
	}
	
	protected String getCookie(Cookie[] cookies, String name){
		if ((cookies == null) || (cookies.length == 0)) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (name.equals(cookie.getName())) {
				String result = cookie.getValue();
				//deleteCookie
				return result;
			}
		}
		return null;
	}
	
	protected void removeCookie(Cookie[] cookies, String name, HttpServletResponse response){
		if ((cookies == null) || (cookies.length == 0)) {
			return;
		}
		for (Cookie cookie : cookies) {
			if (name.equals(cookie.getName())) {
				cookie.setMaxAge(0);
				response.addCookie(cookie);
			}
		}
	}
	
	@Override
	protected void setCookie(String[] tokens, int maxAge, HttpServletRequest request, HttpServletResponse response) {
		//removeCookie(request.getCookies(), rememberMeParameter, response);//response 없어도 되는지 확인
		Cookie test = new Cookie(getParameter(), null);
		test.setMaxAge(0);
		test.setPath("/");
		response.addCookie(test);
		
		super.setCookie(tokens, maxAge, request, response);
	}
	
//	@Override
//	public void setAlwaysRemember(boolean alwaysRemember) {
//		this.alwaysRemember = alwaysRemember;
//	}
	

}
