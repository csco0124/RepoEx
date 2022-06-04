package org.hdcd.common.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler { 
	private static int TIME = 60 * 60; // 1시간
	
	//@Autowired
	//private UserService userService; 
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws IOException, ServletException { 
		
		request.getSession().setMaxInactiveInterval(TIME); 
		
		//userService.updateLoginDateBy(((User) auth.getPrincipal()).getId()); 
		
		super.onAuthenticationSuccess(request, response, auth); 
		
	} 
	
}
