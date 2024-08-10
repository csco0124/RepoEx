package com.narui.bauth.global.oauth2.handler;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.narui.common.api.ErrorCode;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOauth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler{
	@Value("${signin-uri}")
	private String signinUri;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		saveException(request, exception);
		
		String socialRegistration = "SOCIALREGISTRATION";
		boolean isRegistration = false;
		
		boolean isCustomException = false;
		
		List<String> errorCodeList = Stream.of(ErrorCode.values()).map(ErrorCode::getErrCd).collect(Collectors.toList()); 
		for(String errorCode : errorCodeList) {
			if(errorCode.equals(exception.getMessage())) {
				isCustomException = true;
			}
		}
		
		if(socialRegistration.equals(exception.getMessage())) {
			isRegistration = true;
		}
		
		if(isCustomException) {
			if(Objects.equals("USERALREADYEXIST", exception.getMessage())) {
				String uri = "/user/auth/social-list";
				setDefaultFailureUrl(uri + "?error=" + exception.getMessage());
			}else {
				setDefaultFailureUrl(signinUri + "?error=" + exception.getMessage());
			}
		}
		
		if(isRegistration) {
			String uri = "/user/auth/webgradsidvphonesocial";
			setDefaultFailureUrl(uri);
		}
		
		
		super.onAuthenticationFailure(request, response, exception);
	}
	
}
