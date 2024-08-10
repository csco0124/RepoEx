package com.narui.democlienta.security.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationFailHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        request.setAttribute("LOGIN_EXCEPTION", exception); //로그인 실패에 대한 EXception은 CustomAuthenticationEntryPoint 에서 확인가능
        throw exception;
    }
}
