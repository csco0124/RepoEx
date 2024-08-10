package com.narui.democlientb.security.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Controller
public class OAuth2Controller {

    @Value("${server-url}")
    private String serverUrl;

    @Value("${authorization-server-url}")
    private String authorizationServerUrl;

    @GetMapping("/login/approval-waiting")
    public String approvalWaitingPage() {
        return "approvalWaiting";
    }

    @GetMapping("/oauth2/profile")
    public void authorizationProfile(HttpServletResponse response) throws IOException {
        String redirectUrl =
                String.format("%s/profile?redirect-url=%s", authorizationServerUrl, (serverUrl + "/home"));
        response.sendRedirect(redirectUrl);
    }
    
    @GetMapping("/oauth2/socialList")
    public void socialListView(HttpServletResponse response) throws IOException {
    	String redirectUrl =
    			String.format("%s/user/social/social-list", authorizationServerUrl);
    	response.sendRedirect(redirectUrl);
    }
    
    @GetMapping("/oauth2/2faAuth")
    public void resgister2FaAuth(HttpServletResponse response) throws IOException {
    	String redirectUrl =
    			String.format("%s/private/view/multi-factor/register-2fa-auth?redirect-url=%s", authorizationServerUrl, (serverUrl + "/home"));
    	response.sendRedirect(redirectUrl);
    }

    @GetMapping("/login/oauth2")
    public void oAuthLogin(
            HttpServletResponse response,
            @RequestParam(name = "redirect-url", required = false) Optional<String> redirectUrl,
            @RegisteredOAuth2AuthorizedClient("nauth") OAuth2AuthorizedClient authorizedClient, // 로그인 용
            @AuthenticationPrincipal UserDetails userDetails
    ) throws IOException {
        String url = redirectUrl.orElse("/home");
        
        //redirect url 설정
        
        if (url.equals("/admin")) {
            
        }
        response.sendRedirect("/login/rememberSession?url=" + url); // 이동경로 기본은 홈으로
    }
}
