package com.shop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.shop.service.MemberService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	MemberService memberService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		/*
		 *  이 프로젝트에서 인증은 AuthenticationManager를 사용하도록 설정
		 */
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		// UserDetailsService를 구현하고 있는(로그인시 사용자 존재 체크 및 사용자 정보를 리턴하는 코드가 있는) 객체인 memberService를 지정해주며, 비밀번호 암호화를 위해 passwordEncoder()를 지정해줌
        authenticationManagerBuilder.userDetailsService(memberService).passwordEncoder(this.passwordEncoder());
        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
		
		//http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		
		http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
			.and()
			.authenticationManager(authenticationManager)	// 인증은 AuthenticationManager를 사용하도록 설정
			.formLogin()
	        .loginPage("/members/login")	// 로그인 페이지 URL
	        .defaultSuccessUrl("/")			// 로그인 성공시 이동할 URL
	        .usernameParameter("email")		// 로그인시 사용할 파라미터 name
	        .failureUrl("/members/login/error")	// 로그인 실패시 이동할 URL
	        .successHandler(new CustomAuthenticationSuccessHandler())
	        .and()
	        .logout()
	        .logoutRequestMatcher(new AntPathRequestMatcher("/members/logout"))	// 로그아웃 URL
	        .logoutSuccessUrl("/");	// 로그아웃 성공시 이동할 URL
		
		http.authorizeRequests()	// 시큐리티 처리에 HttpServietRequest를 사용하도록 설정
	        .mvcMatchers("/", "/members/**", "/item/**", "/images/**").permitAll()	// 해당 경로는 모든 사용자가(로그인 안해도 됨) 접근 가능하도록 설정 
	        .mvcMatchers("/admin/**").hasRole("ADMIN")	// /admin으로 시작하는 경로는 로그인한 계정의 Role이 ADMIN인 경우에만 접근 가능하도록 설정 
	        .anyRequest().authenticated();	// mvcMatchers() 로 설정한 경로를 제외한 나머지 경로들은 모두 인증을 요구하도록 설정 
	
		http.exceptionHandling()
	    	.authenticationEntryPoint(new CustomAuthenticationEntryPoint());	// 특정 페이지 접근시 인증되지 않은 사용자인 경우 수행되는 핸들러를 등록
		
		return http.build();
	}
	
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/img/**");	// 해당 경로 아래에 있는 파일들은 인증을 무시하도록 설정
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
