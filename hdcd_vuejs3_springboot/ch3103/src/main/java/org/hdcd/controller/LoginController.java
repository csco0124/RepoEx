package org.hdcd.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hdcd.constants.SecurityConstants;
import org.hdcd.domain.AuthenticationRequest;
import org.hdcd.prop.ShopProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {
	
	private final ShopProperties shopProperties;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody AuthenticationRequest authenticationRequest) {
		String username = authenticationRequest.getUsername();
		String password = authenticationRequest.getPassword();

		log.info("username = " + username + " password = " + password);

		List<String> roles = new ArrayList<String>();
		roles.add("ROLE_MEMBER");
		
		byte[] signingKey = shopProperties.getSecretKey().getBytes();
		
		String token = Jwts.builder()
				.signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
				.setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
				.setExpiration(new Date(System.currentTimeMillis() + 864000000))
				.claim("uid", username)
				.claim("rol", roles)
				.compact();

		log.info("token : " + token);
		
		return new ResponseEntity<String>(token, HttpStatus.OK);
	}
	
	@GetMapping("/myinfo")
	public ResponseEntity<String> getMyInfo(@RequestHeader(name = "Authorization") String header) {
		log.info("read : header " + header);
		
		String token = header.substring(7);
        
		log.info("read : token " + token);
        
		byte[] signingKey = shopProperties.getSecretKey().getBytes();

		Jws<Claims> parsedToken = Jwts.parser()
			.setSigningKey(signingKey)
			.parseClaimsJws(token);
        
		log.info("parsedToken : " + parsedToken);
        
		String username = parsedToken.getBody().getSubject();
        
		log.info("username : " + username);
		
		Claims claims = parsedToken.getBody();
        
		Object roles = claims.get("rol");
        
		log.info("roles : " + roles);

		return new ResponseEntity<String>(parsedToken.toString(), HttpStatus.OK);
	}
	
}
