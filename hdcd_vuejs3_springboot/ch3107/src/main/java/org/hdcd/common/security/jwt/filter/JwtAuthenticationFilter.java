package org.hdcd.common.security.jwt.filter;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hdcd.constants.SecurityConstants;
import org.hdcd.prop.ShopProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	
	private ShopProperties shopProperties;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ShopProperties shopProperties) {
		this.authenticationManager = authenticationManager;
		
		this.shopProperties = shopProperties;
		
		setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		log.info("username = " + username + " password = " + password);

		Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

		return authenticationManager.authenticate(authenticationToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication authentication) {
		log.info("successfulAuthentication authentication = " + authentication);
		log.info("successfulAuthentication authentication.getPrincipal() = " + authentication.getPrincipal());
		
		User user = (User)authentication.getPrincipal();
		
		String username = user.getUsername();
		
		List<String> roles = user.getAuthorities()
        	.stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());    
		
		log.info("username = " + username + " roles = " + roles);
		
		String token = createToken(username, roles);

		log.info("token : " + token);

        response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
	}
	
	private String createToken(String username, List<String> roles) {
		byte[] signingKey = shopProperties.getSecretKey().getBytes();
		
		String token = Jwts.builder()
				.signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
				.setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
				.setExpiration(new Date(System.currentTimeMillis() + 864000000))
				.claim("uid", username)
				.claim("rol", roles)
				.compact();
		
		return token;
	}
	
}
