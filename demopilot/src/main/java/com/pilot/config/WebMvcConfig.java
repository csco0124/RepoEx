package com.pilot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.pilot.interceptor.HttpInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${frontend.cors.url}")
	private String frontendCorsUrl;
	
	/**
	 * 인터셉터 설정
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new HttpInterceptor())
		.order(1)
        .addPathPatterns("/**")
        .excludePathPatterns("/css/**", "/images/**", "/js/**", "/*.ico"); // 해당 경로들은 인터셉터가 가로채지 않는다.
	}
	
	/**
	 * CORS 및 csrf Credentials 설정
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(frontendCorsUrl.split(",")).allowedMethods("*").allowCredentials(true);
	}
	
}
