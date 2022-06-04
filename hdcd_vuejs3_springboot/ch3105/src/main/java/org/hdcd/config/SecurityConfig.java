package org.hdcd.config;

import org.hdcd.common.security.jwt.filter.JwtAuthenticationFilter;
import org.hdcd.common.security.jwt.filter.JwtRequestFilter;
import org.hdcd.prop.ShopProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private ShopProperties shopProperties;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
		.withUser("alex").password("{noop}1234").roles("MEMBER")
		.and()
		.withUser("jade").password("{noop}1234").roles("MEMBER", "ADMIN")
		.and()
		.withUser("admin").password("{noop}1234").roles("ADMIN");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().disable()
		.httpBasic().disable();
		
		http.csrf().disable();
		
		http.sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterAt(new JwtAuthenticationFilter(authenticationManager(), shopProperties), UsernamePasswordAuthenticationFilter.class)
		.addFilterBefore(new JwtRequestFilter(shopProperties), UsernamePasswordAuthenticationFilter.class);
	}
	
}
