package org.hdcd.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
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
		
		http.formLogin();
		
		http.exceptionHandling()
		.accessDeniedPage("/accessError");
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
		.withUser("member")
		.password("{noop}1234")
		.roles("MEMBER");
		
		auth.inMemoryAuthentication()
		.withUser("admin")
		.password("{noop}1234")
		.roles("ADMIN");
	}
		
}
