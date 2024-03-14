package com.pilot.config;

import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.pilot.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	private final LoginSuccessHandler loginSuccessHandler;
	private final LoginFailureHandler loginFailureHandler;
	private final UserLogoutSuccessHandler userLogoutSuccessHandler;
	
	private final MemberService memberService;
	
	@Bean
	protected static BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	/**
	 * 모든 사용자의 세션을 확인하기 위해서는 sessionRegistry를 이용해야 하고 이를 주입받기 위해서는 SecurityConfig파일에 등록해주어야 함
	 * @return
	 */
	@Bean
	public SessionRegistry sessionRegistry() {
	    return new SessionRegistryImpl();
	}
	@Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
    }
	
	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		  
        http
            .csrf(AbstractHttpConfigurer::disable)
//        	.csrf(csrf -> csrf
//        			.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//        			.ignoringRequestMatchers(new AntPathRequestMatcher("/csrf"))
//        	)
            .authorizeHttpRequests(requests -> requests
            		.requestMatchers(
            				new AntPathRequestMatcher("/"),
            				new AntPathRequestMatcher("/dbTest"),
            				new AntPathRequestMatcher("/login"),
            				new AntPathRequestMatcher("/logout"),
            				new AntPathRequestMatcher("/csrf"),
            				new AntPathRequestMatcher("/join")
            			).permitAll()
            		.anyRequest().authenticated()
            )
            .formLogin(login -> login
            		.loginPage("/login")
            		.successHandler(loginSuccessHandler)
            		.failureHandler(loginFailureHandler)
            		.usernameParameter("id")
            )
            .logout(logout -> logout
            		.logoutUrl("/logout")
            		.logoutSuccessHandler(userLogoutSuccessHandler)
            )
            .exceptionHandling(handling -> handling
            		.authenticationEntryPoint(customAuthenticationEntryPoint)
            		.accessDeniedHandler(customAccessDeniedHandler)
            ).sessionManagement(session -> session
            		.maximumSessions(1) // 동시접속 세션 수
            		.sessionRegistry(sessionRegistry())
            );
            
        
        return http.build();
        /*
        http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(requests -> requests
        		.requestMatchers(
        				new AntPathRequestMatcher("/"),
        				new AntPathRequestMatcher("/dbTest"),
        				new AntPathRequestMatcher("/login"),
        				new AntPathRequestMatcher("/logout"),
        				new AntPathRequestMatcher("/csrf"),
        				new AntPathRequestMatcher("/join")
        			).permitAll()
                .anyRequest().authenticated()
        )
        .formLogin() // 폼 기반 로그인 설정
        .loginPage("/login")
        .successHandler(loginSuccessHandler)
        .failureHandler(loginFailureHandler)
        .usernameParameter("id").and()
        .logout().logoutUrl("/logout").logoutSuccessHandler(userLogoutSuccessHandler).and()
        .exceptionHandling()
        .authenticationEntryPoint(customAuthenticationEntryPoint)
        .accessDeniedHandler(customAccessDeniedHandler);
        */
       
    }
	
}
