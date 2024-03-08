package com.pilot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
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
	
	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

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
        		
        return http.build();
    }
	
}
