package com.narui.common.security.exception;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Objects;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.stereotype.Component;

import com.narui.common.api.ApiErrResponse;
import com.narui.common.api.ErrorCode;
import com.narui.common.util.HttpUtil;
import lombok.extern.slf4j.Slf4j;

/**
 * 401 인증이 필요한 경우 처리
 */
@Component
@Slf4j
public class AjaxAuthenticationEntryPoint implements AuthenticationEntryPoint {
	
  private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

  //oauth2_registered_client의 client_id 속성명
  private final String CLIENT_ID = "client_id";
  
  @Autowired
  private HttpSession session;
  
  @Value("${signin-uri}")
  private String signinUri;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException, ServletException {

    log.debug("{} {} ->{}", HttpUtil.getRequestInfo(request), exception.getMessage(), signinUri);
    
    Enumeration<String> params = request.getParameterNames();
    while(params.hasMoreElements()) {
    	String name = (String) params.nextElement();
    	System.out.println(name + ":" + request.getParameter(name));
    }
    
    String clientId = request.getParameter(CLIENT_ID);
    String redirectUri = signinUri;
    session.removeAttribute(CLIENT_ID);
    
    if(!Objects.equals(null, clientId)) {
    	redirectUri =  signinUri + "?clientId=" + clientId;
    	session.setAttribute(CLIENT_ID, clientId);
    }
    
    // Ajax 요청
    if (HttpUtil.isAjaxRequest(request)) {
        ApiErrResponse.jsonErrorResponse(response, ErrorCode.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED.value());
      return;
    }
    // 일반 요청
    if ("".equals(signinUri) || signinUri == null) {
      // 인증필요 401에러페이지로 이동
      response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
    } else {
      // 로그인 페이지로 이동
      this.redirectStrategy.sendRedirect(request, response, redirectUri);
    }
  }
}
