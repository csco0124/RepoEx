package org.hdcd.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hdcd.constants.SecurityConstants;
import org.hdcd.domain.AuthenticationRequest;
import org.hdcd.prop.ShopProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	
}
