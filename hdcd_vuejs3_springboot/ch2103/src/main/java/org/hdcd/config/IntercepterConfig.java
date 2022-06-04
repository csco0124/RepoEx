package org.hdcd.config;

import org.hdcd.common.interceptor.AccessLoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new AccessLoggingInterceptor()).addPathPatterns("/**").excludePathPatterns("/resources/**");
		
		WebMvcConfigurer.super.addInterceptors(registry);
	}
}
