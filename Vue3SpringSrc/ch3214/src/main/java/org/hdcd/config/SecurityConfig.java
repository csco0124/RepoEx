package org.hdcd.config;

import javax.sql.DataSource;

import org.hdcd.common.security.CustomAccessDeniedHandler;
import org.hdcd.common.security.CustomLoginSuccessHandler;
import org.hdcd.common.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

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
		.logoutUrl("/logout");
		
		http.exceptionHandling()
		.accessDeniedHandler(accessDeniedHandler());
		
		http.rememberMe()
		.key("hdcd")
		.tokenRepository(createJDBCRepository())
		.tokenValiditySeconds(60*60*24);
	}
	
	@Bean
	public UserDetailsService customUserDetailsService() {
		return new CustomUserDetailsService();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new CustomLoginSuccessHandler();
	}
	
	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService()).passwordEncoder(passwordEncoder());
	}
	
	private PersistentTokenRepository createJDBCRepository() {
		JdbcTokenRepositoryImpl repo = new JdbcTokenRepositoryImpl();
		repo.setDataSource(dataSource);
		
		return repo;
	}

}
