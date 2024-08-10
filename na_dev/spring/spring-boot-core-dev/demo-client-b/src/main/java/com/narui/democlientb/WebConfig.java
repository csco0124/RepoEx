package com.narui.democlientb;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.narui.democlientb.common.aop.Interceptor;
import com.narui.democlientb.common.handler.SessionInterceptorHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class WebConfig implements WebMvcConfigurer {

	private List<String> excludePathPattern = null;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		this.excludePathPattern = new ArrayList<String>();
		this.excludePathPattern.add("/login/**");
		this.excludePathPattern.add("/login/admin");
		this.excludePathPattern.add("/login/denied");
		this.excludePathPattern.add("/common/sessionChk/**");
		this.excludePathPattern.add("/html/PIP.html");
		this.excludePathPattern.add("/**/*.min.js");
		this.excludePathPattern.add("/**/*.js");
		this.excludePathPattern.add("/**/*.css");
		this.excludePathPattern.add("/**/*.png");
		this.excludePathPattern.add("/**/*.jpg");
		this.excludePathPattern.add("/**/*.jpg");
		this.excludePathPattern.add("/font/**");
		registry.addInterceptor(new Interceptor());
		registry.addInterceptor(sessionInterceptorHandler())
				.excludePathPatterns(this.excludePathPattern);
	}
	
    @Bean
    public SessionInterceptorHandler sessionInterceptorHandler() {
    	return new SessionInterceptorHandler();
    }
}