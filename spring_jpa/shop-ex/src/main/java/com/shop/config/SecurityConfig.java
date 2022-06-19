package com.shop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.shop.service.MemberService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	MemberService memberService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		/*
		http.authorizeRequests()
	        .mvcMatchers("/", "/members/**", "/item/**", "/images/**").permitAll()
	        .mvcMatchers("/admin/**").hasRole("ADMIN")
	        .anyRequest().authenticated();
		
		http.exceptionHandling()
		    .authenticationEntryPoint(new CustomAuthenticationEntryPoint());
		*/
		http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		
		http.formLogin()
	        .loginPage("/members/login")	// 로그인 페이지 URL
	        .defaultSuccessUrl("/")			// 로그인 성공시 이동할 URL
	        .usernameParameter("email")		// 로그인시 사용할 파라미터 name
	        .failureUrl("/members/login/error")	// 로그인 실패시 이동할 URL
	        .and()
	        .logout()
	        .logoutRequestMatcher(new AntPathRequestMatcher("/members/logout"))	// 로그아웃 URL
	        .logoutSuccessUrl("/");	// 로그아웃 성공시 이동할 URL
			
		return http.build();
	}
	
	/**
	 * 이 프로젝트에서 인증은 AuthenticationManager를 사용하도록 설정
	 * @param auth
	 * @return
	 * @throws Exception
	 */
	/*@Bean
	public AuthenticationManager filterChain(AuthenticationManagerBuilder auth) throws Exception {
		// UserDetailsService를 구현하고 있는 객체인 memberService를 지정해주며, 비밀번호 암호화를 위해 passwordEncoder()를 지정해줌
		auth.userDetailsService(memberService).passwordEncoder(this.passwordEncoder());	
		return auth.build();
	}*/
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**");
    }
	
}
