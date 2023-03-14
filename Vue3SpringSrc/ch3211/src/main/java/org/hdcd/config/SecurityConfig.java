package org.hdcd.config;

import javax.sql.DataSource;

import org.hdcd.common.security.CustomAccessDeniedHandler;
import org.hdcd.common.security.CustomLoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	DataSource dataSource;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		log.info("security config ...");
		
		http.authorizeRequests()
		.antMatchers("/board/list")
		.permitAll();
		
		http.authorizeRequests()
		.antMatchers("/board/register")
		.hasRole("MEMBER");
		
		http.authorizeRequests()
		.antMatchers("/notice/list")
		.permitAll();
		
		http.authorizeRequests()
		.antMatchers("/notice/register")
		.hasRole("ADMIN");
		
		http.formLogin()
		.loginPage("/login")
		.successHandler(authenticationSuccessHandler());
		
		http.logout()
		.logoutUrl("/logout")
		.invalidateHttpSession(true);
		
		http.exceptionHandling()
		.accessDeniedHandler(accessDeniedHandler());
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		String query1 = "SELECT user_id, user_pw, enabled FROM member WHERE user_id = ?";
		String query2 ="SELECT b.user_id, a.auth FROM member_auth a, member b WHERE a.user_no = b.user_no AND b.user_id = ?";
			
		auth.jdbcAuthentication()
		.dataSource(dataSource)
		
		.usersByUsernameQuery(query1)
		.authoritiesByUsernameQuery(query2)
		
		.passwordEncoder(passwordEncoder());
	}	
	
	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}
	
	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new CustomLoginSuccessHandler();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
