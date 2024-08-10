package com.narui.bauth.domain.socialAuth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class SocialAuthController {
	@Autowired
	private final PrincipalUtil principalUtil;
	
	@GetMapping(value="/private/view/social/social-list")
	public String socialAuthList(HttpServletRequest request) {
		HttpSession session = request.getSession();
		SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//test
		MultiFactorUserDetails userInfo = (MultiFactorUserDetails) principalUtil.getPrincipal();
		session.setAttribute("userEmail", userInfo.getEmail());
		
		return "user/socialList";
	}
}
