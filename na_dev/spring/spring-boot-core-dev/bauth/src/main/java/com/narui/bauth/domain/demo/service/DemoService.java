package com.narui.bauth.domain.demo.service;

import java.net.URLEncoder;

import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class DemoService {
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final UserRepository userRepository;
	
	public DemoService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	//사용자 인증을 완료하면 secret의 값을 변경하는 메서드
	public String authenticateByOtp(String email ,String password) throws Exception {
		UserEntity user = userRepository.findByEmail(email);
		boolean result = passwordEncoder.matches(password, user.getPassword());

		if(!result) {
			throw new Exception();
		}

		String APP_NAME = "BAUTH";
		String secret = Base32.random();
		
		user.updateSecret(secret);

		String content = "otpauth://totp/"
			+ URLEncoder.encode(APP_NAME + ":" + email, "UTF-8").replace("+", "%20")
			+ "?secret="
			+ URLEncoder.encode(secret, "UTF-8").replace("+", "%20")
			+ "&issuer="
			+ URLEncoder.encode(APP_NAME, "UTF-8").replace("+", "%20");
		
		return content;
	}
}
