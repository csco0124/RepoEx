package com.narui.bauth.global.aop;

import java.util.Map;
import java.util.Objects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.narui.bauth.domain.loginLog.dto.LoginLogDto;
import com.narui.bauth.domain.loginLog.service.OAuth2LoginLogService;
import com.narui.bauth.domain.socialAuth.service.SocialAuthService;
import com.narui.bauth.domain.user.entity.UserEntity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class LoginAOP {
	
	@Autowired
	private OAuth2LoginLogService oAuth2LoginLogService;
	@Autowired
	private SocialAuthService socialAuthService;
	
	/**
     * 이메일 로그인 성공 AOP
     * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 리턴된 후에 실행
     *
     * @param joinPoint
     * @param result
     */
    @AfterReturning(pointcut = "execution(* com.narui.common.security.exception.AjaxAuthenticationSuccessHandler.onAuthenticationSuccess(..))", returning = "result")
    public void logAfterSuccessReturning(JoinPoint joinPoint, Object result) {
        try {
        	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
            Map<String, String[]> paramMap = request.getParameterMap();
            
            String[] emailArr = paramMap.get("email");
            if(Objects.equals(null, emailArr)) {
            	return;
            }
            for(String email : emailArr) {
            	LoginLogDto loginLogDto = new LoginLogDto();
            	loginLogDto.setType("S");
                loginLogDto.setEmail(email);
                loginLogDto.setStatusNum(response.getStatus());
                loginLogDto.setLoginChannel("email");
                oAuth2LoginLogService.saveLoginLog(loginLogDto);
            }
        } catch(Exception e) {
        	log.error(e.getMessage());
        	e.printStackTrace();
        }
    }
    
    /**
     * 이메일 로그인 실패 AOP
     * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 리턴된 후에 실행
     *
     * @param joinPoint
     * @param result
     * @throws Exception 
     */
    @AfterReturning(pointcut = "execution(* com.narui.common.security.exception.AjaxAuthenticationFailureHandler.onAuthenticationFailure(..))", returning = "result")
    public void logAfterFailureReturning(JoinPoint joinPoint, Object result) throws Exception {
    	try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
            
            Map<String, String[]> paramMap = request.getParameterMap();
            String[] emailArr = paramMap.get("email");
            if(Objects.equals(null, emailArr)) {
            	return;
            }
            if(emailArr != null && emailArr.length > 0) {
            	for(String email : emailArr) {
                	LoginLogDto loginLogDto = new LoginLogDto();
                    loginLogDto.setType("E");
                    loginLogDto.setEmail(email);
                    loginLogDto.setStatusNum(response.getStatus());
                    loginLogDto.setLoginChannel("email");
                    Object obj = null;
                    Exception exception = null;
                    if(joinPoint.getArgs() != null) {
                    	obj = joinPoint.getArgs()[(joinPoint.getArgs().length-1)];
                    	exception = (Exception)obj;
                    	loginLogDto.setErrMsg(exception.getMessage());
                    }
                    oAuth2LoginLogService.saveLoginLog(loginLogDto);
                }
            }
    	}catch(Exception e) {
    		log.error(e.getMessage());
    		e.printStackTrace();
    	}
    }
    
	/**
     * 소셜 로그인 성공 AOP
     * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 리턴된 후에 실행
     *
     * @param joinPoint
     * @param result
     */
    @AfterReturning(pointcut = "execution(* com.narui.bauth.global.oauth2.service.CustomOauth2UserService.loadUser(..))", returning = "result")
    public void logAfterSocialSuccessReturning(JoinPoint joinPoint, Object result) {
        try {
        	//HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
            DefaultOAuth2User user = (DefaultOAuth2User) result; 
            Map<String, Object> userAttributes = user.getAttributes();
            
            LoginLogDto loginLogDto = new LoginLogDto();
            loginLogDto.setType("S");
            loginLogDto.setEmail(""+userAttributes.get("email"));
            loginLogDto.setStatusNum(response.getStatus());
            loginLogDto.setLoginChannel((""+userAttributes.get("attributeName")).toLowerCase());
            
            oAuth2LoginLogService.saveLoginLog(loginLogDto);
        } catch(Exception e) {
        	log.error(e.getMessage());
        	e.printStackTrace();
        }
    }
    
	/**
     * 소셜 로그인 실패 AOP
     * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 리턴된 후에 실행
     *
     * @param joinPoint
     * @param result
     */
    @AfterThrowing(pointcut = "execution(* com.narui.bauth.global.oauth2.service.CustomOauth2UserService.loadUser(..))", throwing = "exception")
    public void logAfterSocialExceptionReturning(JoinPoint joinPoint, Exception exception) {
        try {
        	//HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
            
            // 사용자정보 가져오기
            OAuth2UserRequest userRequest = (OAuth2UserRequest)joinPoint.getArgs()[0];
            if(userRequest != null) {
            	OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
                OAuth2User oAuth2User = delegate.loadUser(userRequest);
                String attributeKey = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
                Map<String, Object> attributes = oAuth2User.getAttributes();
                String attributeName = userRequest.getClientRegistration().getRegistrationId();
                String attributeId = socialAuthService.getAttributeId(attributes.get(attributeKey), attributeName);
                UserEntity socialUser = socialAuthService.selectSocialAuth(attributeId, attributeName);
        		
                
                LoginLogDto loginLogDto = new LoginLogDto();
                
                loginLogDto.setType("E");
                loginLogDto.setEmail((socialUser != null) ? socialUser.getEmail() : null);
                loginLogDto.setStatusNum(response.getStatus());
                loginLogDto.setLoginChannel(userRequest.getClientRegistration().getClientName().toLowerCase());
                loginLogDto.setErrMsg(exception.getMessage());
                oAuth2LoginLogService.saveLoginLog(loginLogDto);
            }
            
        } catch(Exception e) {
        	log.error(e.getMessage());
        	e.printStackTrace();
        }
    }
}
