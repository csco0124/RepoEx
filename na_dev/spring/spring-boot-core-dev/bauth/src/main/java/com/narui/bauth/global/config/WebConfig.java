package com.narui.bauth.global.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	//admin
    private static final String ADMIN_LOCATION = "classpath:/static/admin/";
    private static final String PRIVATE_ADMIN = "/private/view/admin";
    private static final String ADMIN_INDEX = "/static/admin/index.html";

    private static final String USER_ASSETS_LOCATION = "classpath:/static/user/assets/";
    private static final String USER_ASSETS = "/assets";
    private static final String USER_ASSETS_INDEX = "/static/user/assets/";
    
    //user
    private static final String USER_LOCATION = "classpath:/static/user/";
    private static final String USER = "/user";
    private static final String USER_INDEX = "/static/user/index.html";

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //admin
        addResourceHandler(registry, PRIVATE_ADMIN, ADMIN_LOCATION, ADMIN_INDEX);
        
        //user
        addResourceHandler(registry, USER, USER_LOCATION, USER_INDEX);
        
        //user-asset
        addResourceHandler(registry, USER_ASSETS, USER_ASSETS_LOCATION, USER_ASSETS_INDEX);
    }

    private void addResourceHandler(ResourceHandlerRegistry registry, String resourcePath, String resourceLocation, String fallbackResource) {
        registry.addResourceHandler(resourcePath, resourcePath + "/", resourcePath + "/**")
                .addResourceLocations(resourceLocation)
                .resourceChain(false)
                //                .setCachePeriod(3600) // 리소스 캐싱시간(초) / TODO : SPA 페이지에 브라우저 캐싱이 핑효한가 검토 후 적용
                .addResolver(new PathResourceResolver() { // 요청된 리소스 경로 처리 -> 해당 경로에 반환되는 리소스가 없다면 static index.html 랜더링
                    @Override
                    protected Resource getResource(String requestPath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(requestPath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource(fallbackResource);
                    }
                });
    }
}
