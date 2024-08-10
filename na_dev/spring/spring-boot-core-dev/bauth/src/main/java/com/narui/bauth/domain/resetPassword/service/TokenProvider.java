package com.narui.bauth.domain.resetPassword.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenProvider {
	
	public TokenProvider() {}
	
	private final int TOKEN_VALIDITY = 60 * 60 * 1000; // 1 hour

    public String createToken(String email, String secret) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + TOKEN_VALIDITY);
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    public Claims getClaimsFromToken(String token, String secret) throws JwtException {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }
    
    public JwsHeader<?> getClaimsFromTokenHeader(String token, String secret) throws JwtException {
    	JwsHeader<?> claims = Jwts.parser()
    			.setSigningKey(secret)
    			.parseClaimsJws(token)
    			.getHeader();
    	return claims;
    }
    
}