package com.exam.config;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.exam.dto.TokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {
	private final Key key;

	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	// 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
	public TokenDto generateToken(Authentication authentication) {
		// 권한 가져오기
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

		long now = (new Date()).getTime();
		// Access Token 생성
		// 숫자 86400000은 토큰의 유효기간으로 1일을 나타냅니다. 보통 토큰은 30분 정도로 생성하는데 테스트를 위해 1일로 설정했습니다.
		// 1일: 24*60*60*1000 = 86400000
		//Date accessTokenExpiresIn = new Date(now + 86400000);
		// 1 * 60 * 1000L : 1분 / 10000 : 10초
		Date accessTokenExpiresIn = new Date(now + 20000);
		String accessToken = Jwts.builder().setSubject(authentication.getName()).claim("auth", authorities)
				.setExpiration(accessTokenExpiresIn).signWith(key, SignatureAlgorithm.HS256).compact();

		// Refresh Token 생성
		String refreshToken = Jwts.builder().setExpiration(new Date(now + 86400000)).signWith(key, SignatureAlgorithm.HS256).compact();
		
		TokenDto dto = new TokenDto("Bearer", accessToken, refreshToken);
		
		return dto;
	}

	// JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
	public Authentication getAuthentication(String accessToken) {
		// 토큰 복호화
		Claims claims = parseClaims(accessToken);

		if (claims.get("auth") == null) {
			throw new RuntimeException("권한 정보가 없는 토큰입니다.");
		}

		// 클레임에서 권한 정보 가져오기
		Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
				.map(SimpleGrantedAuthority::new).collect(Collectors.toList());

		// UserDetails 객체를 만들어서 Authentication 리턴
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	// Access/Refresh 토큰 정보를 검증하는 메서드
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
			throw new JwtException("손상된 토큰");
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
			throw new JwtException("만료된 토큰");
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
			throw new JwtException("지원하지 않는 토큰");
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
			throw new JwtException("유효하지 않은 토큰");
		}
	}
	
	/**
	 * JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
	 * @param accessToken
	 * @return
	 */
	private Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}
