package org.hdcd.controller;

import org.hdcd.prop.ShopProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {
	
	private final ShopProperties shopProperties;

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
