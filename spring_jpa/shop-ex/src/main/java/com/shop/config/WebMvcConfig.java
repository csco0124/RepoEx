package com.shop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${uploadPath}")
    String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	// 1. html페이지에서 입력 URL이 /images로 시작하는 경우 uploadPath폴더를 기준으로 파일을 읽어오도록 설정
    	// 2. 로컬 컴퓨터에 저장된 파일을 읽어올 root 경로 설정
        registry.addResourceHandler("/images/**").addResourceLocations(uploadPath);
    }
}
