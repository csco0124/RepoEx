package com.narui.common;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		//return http.csrf().disable().build();
		/*
		return  http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
					.and()
					.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "**").permitAll()	// preflight 요청은 모두 허가함
					.and()
					.build();
		*/
		return http.csrf().ignoringAntMatchers("/dummy/**") // CSRF를 무시할 경로
		            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
		        .and()
		        .authorizeRequests().antMatchers(HttpMethod.OPTIONS, "**").permitAll() // OPTIONS 요청은 모두 허용
		        .and()
		        .build();
    }
}
