package com.narui.bauth.domain.resetPassword.service;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.mail.MailParseException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwsHeader;

import com.narui.bauth.domain.mail.dto.MailDto;
import com.narui.bauth.domain.mail.service.MailService;
import com.narui.bauth.domain.resetPassword.dto.ResetPasswordReqDto;
import com.narui.bauth.domain.resetPassword.entity.ResetPasswordEntity;
import com.narui.bauth.domain.resetPassword.repository.ResetPasswordRepository;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.user.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;

@Service
public class ResetPasswordService {
	
	private final UserRepository userRepository;
	private final TokenProvider tokenProvider;
	private final MailService mailService;
	private final UserService userService;
	private final ResetPasswordRepository resetPasswordRepository;
	
	public ResetPasswordService(UserRepository userRepository, TokenProvider tokenProvider
			, MailService mailService, UserService userService, ResetPasswordRepository resetPasswordRepository) {
		this.userRepository = userRepository;
		this.tokenProvider = tokenProvider;
		this.mailService = mailService;
		this.userService = userService;
		this.resetPasswordRepository = resetPasswordRepository;
	}
	
	@Value("${jwt.issuer-uri}")
	private String issuerUri;
		
	public void sendPasswordResetLink(String email) throws MailParseException, MessagingException {
		
		UserEntity userEntity = userRepository.findByEmail(email);
		
		String resetPasswordId;
		
		if (userEntity == null) {
			throw new UsernameNotFoundException(ErrorCode.USERNOTFOUND.getErrMsg());
		} else {
			resetPasswordId = createResetPasswordEntity(email);
			
			// 비밀번호 초기화 페이지 링크 생성
			String resetLink = issuerUri + "/public/api/auth/redirectResetPassword?resetPasswordId=" + resetPasswordId;
			HashMap<String, String> values = new HashMap<String, String> ();
			values.put("resetLink", resetLink);
			
			String subject = "[나루아이] 비밀번호 재설정을 위한 안내메일입니다."; // 메일제목
			String templatePath = "/html/guideForPasswordReset.html"; // 템플릿 경로     
			
			MailDto mailDto = MailDto.builder()
				.to(email)
				.subject(subject)
				.templatePath(templatePath)
				.values(values)
				.build();
			
			mailService.sendEmailWithTemplate(mailDto);
		}
		
	}
	@Transactional
	public String redirectResetPassword(String resetPasswordId) {
		ResetPasswordEntity resetPasswordEntity = resetPasswordRepository.findById(resetPasswordId).orElse(null);
		Timestamp now = new Timestamp((new Date()).getTime());
		
		//재설정 데이터가 삭제되었거나, 만료시간이 지났을 때
		if(Objects.equals(resetPasswordEntity, null) || now.after(resetPasswordEntity.getExpiredDate())) {
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
		}

		// 이메일 base64 암호화
		byte[] emailBytes = resetPasswordEntity.getEmail().getBytes();
		String encodedEmail = Base64.getEncoder().encodeToString(emailBytes);
		
		return encodedEmail;
	}
	
	public ResponseCookie createResetPasswordCookie(String resetPasswordId) {
		return ResponseCookie.from("resetPasswordId", resetPasswordId)
			.httpOnly(true)
			.secure(true)
			.sameSite("Strict")
			.path("/public/api/auth/resetPassword")
			.maxAge(60 * 60) //1시간
			.build();
	}
	
	@Transactional
	public ResponseCookie resetPassword(ResetPasswordReqDto resetPasswordDto) {
		byte[] emailBytes = Base64.getDecoder().decode(resetPasswordDto.getEmail());
		String decodeEmail = new String(emailBytes);
		UserEntity user = userRepository.findByEmail(decodeEmail);
		
		if(Objects.equals(user, null)) {
			throw new UsernameNotFoundException(ErrorCode.USERNOTFOUND.getErrMsg());
		}
		
		ResetPasswordEntity resetPasswordEntity = resetPasswordRepository.findById(resetPasswordDto.getResetPasswordId()).orElse(null);
//		Timestamp now =resetPasswordRepository.getCurrentTime();
		Timestamp now = new Timestamp((new Date()).getTime());
		
		//재설정 데이터가 삭제되었거나, 만료시간이 지났을 때
		if(Objects.equals(resetPasswordEntity, null) || now.after(resetPasswordEntity.getExpiredDate()))  {
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
		}
		
		//parameter의 이메일과 DB에 있는 이메일의 정보가 일치하지 않는 경우
		if(!Objects.equals(decodeEmail, resetPasswordEntity.getEmail())) {
			throw new ApiException(ErrorCode.BADREQUEST);
		}
		
//		try {
//			//header 데이터 가져오면서 이메일 변조 검증
//			JwsHeader<?> header = tokenProvider.getClaimsFromTokenHeader(resetPasswordDto.getToken(), secret);
//			if(!"HS512".equals(header.get("alg"))) {
//				//알고리즘 조작으로 인한 데이터 탈취 방지
//				throw new ApiException(ErrorCode.FORBIDDEN);
//			}
//		} catch(ExpiredJwtException e) { // Token이 만료된 경우 | 변조된 경우
//			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
//		}

		user.updatePassword(resetPasswordDto.getPassword());
		
		userService.savePassword(user);
		resetPasswordRepository.deleteById(resetPasswordDto.getResetPasswordId());
		
		//쿠키 강제 만료
		return ResponseCookie.from("resetPasswordId", resetPasswordDto.getResetPasswordId())
				.httpOnly(true)
				.secure(true)
				.sameSite("Strict")
				.path("/public/api/auth/resetPassword")
				.maxAge(0) //1시간
				.build();
	}

	@Transactional
	public String createResetPasswordEntity(String email) {
		String id = UUID.randomUUID().toString().replace("-", "");
		
		int validTime = 60 * 60 * 1000; // 1 hour
		Date now = new Date();
		Timestamp expiredDate = new Timestamp(now.getTime() + validTime);
		
		ResetPasswordEntity resetPasswordEntity = ResetPasswordEntity.builder()
				.id(id)
				.email(email)
				.expiredDate(expiredDate)
				.build();
		resetPasswordRepository.save(resetPasswordEntity);
		
		return id;
	}
}