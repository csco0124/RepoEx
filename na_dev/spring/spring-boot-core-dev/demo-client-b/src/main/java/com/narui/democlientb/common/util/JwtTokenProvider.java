package com.narui.democlientb.common.util;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

	@Value("${jwt.key}")
	private String secretKey;

	// 객체 초기화, secretKey를 Base64로 인코딩
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// 토큰 생성
	public String createToken(String userPk, long tokenValidTime, List<String> roles) { // userPK = email
		Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
		claims.put("roles", "TEST"); // 정보는 key / value 쌍으로 저장
		Date now = new Date();
		return Jwts.builder().setClaims(claims) // 정보 저장
							 .setIssuedAt(now) // 토큰 발행 시간 정보
							 .setExpiration(new Date(now.getTime() + tokenValidTime)) 	// 토큰 유효시각 설정
							 .signWith(SignatureAlgorithm.HS256, secretKey) 			// 암호화 알고리즘과, secret 값
							 .compact();
	}

	// 인증 정보 조회
	/*
	 * public Authentication getAuthentication(String token) { UserDetails
	 * userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
	 * return new UsernamePasswordAuthenticationToken(userDetails, "",
	 * userDetails.getAuthorities()); }
	 */

	// 토큰에서 정보 추출
	public String getSubject(String token) {
		Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	// 토큰 유효성, 만료일자 확인
	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}
}
