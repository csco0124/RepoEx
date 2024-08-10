package com.narui.democlienta.security.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.log.LogMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;

import com.narui.democlienta.security.UserDetail;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Objects;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    @Autowired
    private HttpSession session;
    @Value("${server-url}")
    private String serverUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        Object refererObj = session.getAttribute("referer");
        //세션에 담긴 referer가 null일시 root 페이지로 이동
        String referer = Objects.equals(refererObj, null)? serverUrl + "/" : refererObj.toString();
        
        //클라이언트의 referer가 아닌 경우 root 페이지로 이동
    	if(!referer.contains(serverUrl)) {
    		referer = serverUrl + "/";
    	}
        
        response.sendRedirect(referer);
        session.removeAttribute("referer");
        
        super.onAuthenticationSuccess(request, response, authentication);
    }

    /*
    * 로그인 완료후 화면상에 UserDetails 정보 추가
    * */
    @Override
    protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);
        if (response.isCommitted()) {
            this.logger.debug(LogMessage.format("Did not redirect to %s since response already committed.", targetUrl));
            return;
        }
        this.redirectStrategy.sendRedirect(request, response, "/login/oauth2?redirect-url=" + targetUrl);
    }
}
