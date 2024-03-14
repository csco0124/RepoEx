package com.pilot.config;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.stereotype.Component;

@Component
public class CustomHttpSessionListener implements HttpSessionListener {
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		System.out.println("세션 타임아웃시....");
		HttpSession session = se.getSession();
		System.out.println("sessionDestroyed sessionID : " + session.getId());
	}
	
}
