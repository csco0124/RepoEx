package com.narui.democlientb.security.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;


public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Value("${server-url}")
    private String serverUrl;

    @Value("${authorization-server-url}")
    private String authorizationServerUrl;
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        /* 인증서버 로그아웃 요청 후 리다이렉트 주소로 이동 */
        String loginPage = serverUrl + Optional.ofNullable(request.getParameter("redirect-url")).orElse("/");
        String logoutUrl = String.format("%s/html/logout.html?redirect-url=%s", authorizationServerUrl, loginPage);
        response.sendRedirect(logoutUrl);
    }
}
