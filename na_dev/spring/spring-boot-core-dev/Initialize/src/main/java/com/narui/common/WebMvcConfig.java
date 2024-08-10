package com.narui.common;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.narui.common.interceptor.HttpInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${frontend.cors.url}")
	private String frontendCorsUrl;
	@Value("${frontend.custom.add.static.location}")
	private String customStaticLocation;
	@Value("${frontend.custom.add.static.file.path}")
	private String customStaticFilePath;
	
	/**
	 * 인터셉터 설정
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(new HttpInterceptor())
//        .addPathPatterns("/**")
//        .excludePathPatterns("/css/**", "/images/**", "/js/**"); // 해당 경로들은 인터셉터가 가로채지 않는다.
	}

	
	/**
	 * 추가 스태틱 경로 설정
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if(StringUtils.isNotBlank(customStaticLocation) && StringUtils.isNotBlank(customStaticFilePath)) {	// 추가로 static 경로를 위한 사용자정의 static 경로가 properties에 존재하는 경우
			// url(addResourceHandler) : /imagePath/ 일 때 addResourceLocations 경로의 파일을 찾아서 리턴
			registry.addResourceHandler(customStaticLocation).addResourceLocations("file:///"+customStaticFilePath);
		}

		// nAuth user static 경로 설정
		String USER_LOCATION = "classpath:/static/user/";
		String USER = "/public/view/auth";
		String USER_INDEX = "/static/user/index.html";

		registry.addResourceHandler(USER, USER + "/", USER + "/**")
						.addResourceLocations(USER_LOCATION)
						.resourceChain(false)
						.addResolver(new PathResourceResolver() { // 요청된 리소스 경로 처리 -> 해당 경로에 반환되는 리소스가 없다면 static index.html 랜더링
                    @Override
                    protected Resource getResource(String requestPath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(requestPath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource(USER_INDEX);
                    }
                });

	}


	/**
	 * CORS 및 csrf Credentials 설정
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(frontendCorsUrl.split(",")).allowedMethods("*").allowCredentials(true);
	}
	
}
