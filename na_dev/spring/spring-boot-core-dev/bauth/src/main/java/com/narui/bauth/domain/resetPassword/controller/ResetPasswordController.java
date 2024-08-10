package com.narui.bauth.domain.resetPassword.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.SignatureException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailParseException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.narui.common.api.ApiException;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.common.api.ErrorCode;
import com.narui.common.api.ParamException;
import com.narui.bauth.domain.resetPassword.dto.ResetPasswordReqDto;
import com.narui.bauth.domain.resetPassword.service.ResetPasswordService;
import com.narui.bauth.domain.resetPassword.service.TokenProvider;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.user.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.JwtException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import kotlin.jvm.Throws;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ResetPasswordController {
	
	private final ResetPasswordService resetPasswordService;
	private final UserRepository userRepository;
	private final TokenProvider tokenProvider;
	private final UserService userService;
	
	public ResetPasswordController(ResetPasswordService resetPasswordService, UserRepository userRepository, TokenProvider tokenProvider, UserService userService) {
		this.resetPasswordService = resetPasswordService;
		this.userRepository = userRepository;
		this.tokenProvider = tokenProvider;
		this.userService = userService;
	}

	@Value("${jwt.issuer-uri}")
	private String issuerUri;
	
	/**
	 * 비밀번호 찾기
	 * @param email
	 * @throws MessagingException 
	 * @throws MailParseException 
	 */
	@PostMapping("/public/api/findPassword")
	public ResponseEntity<Object> findPasswordTest(String email) {
		
		HashMap<String, String> result = new HashMap<>();
		result.put("email", email);
		
		try {
			resetPasswordService.sendPasswordResetLink(email);
		} catch(MailParseException e) {
			log.debug("MailParseException :::" + e);
			return new ResponseEntity<> (result, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (MessagingException e) {
			log.debug("MessagingException :::" + e);
			return new ResponseEntity<> (result, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<> (result, HttpStatus.OK);
		
//		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resetPwTokenCookey.toString()).body(result);
	}
	
	@GetMapping("/public/api/auth/redirectResetPassword")
	public void redirectResetPassword(@RequestParam(name = "resetPasswordId") String resetPasswordId, HttpServletResponse response) throws IOException {
		if(Objects.equals(resetPasswordId, null)) {
			throw new ApiException(ErrorCode.PARAM_ERR);
		}
		String email = null;
		try {
			email = resetPasswordService.redirectResetPassword(resetPasswordId);
		} catch (Exception e) {
			response.sendRedirect(issuerUri + "/user/auth");
		}
		ResponseCookie resetPwIdCookie = resetPasswordService.createResetPasswordCookie(resetPasswordId);
		
		String uri = issuerUri + "/user/auth/resetPassword?email=" + email;
		
		response.addHeader(HttpHeaders.SET_COOKIE, resetPwIdCookie.toString());
		response.sendRedirect(uri);
	}
	
	@PostMapping("/public/api/auth/resetPassword")
	public ResponseEntity<Object> reactResetPassword(@CookieValue("resetPasswordId") @NotNull String resetPasswordId,
			@Validated ResetPasswordReqDto resetPasswordDto, Errors errors) {
		if (Objects.equals(resetPasswordDto.getPassword(), null)) {
			throw new ApiException(ErrorCode.PARAM_ERR);
		}
		
		resetPasswordDto.setResetPasswordId(resetPasswordId);
		
		ResponseCookie resetPwToken = resetPasswordService.resetPassword(resetPasswordDto);
		
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, resetPwToken.toString()).body(null);
	}
	
	
	
	
	/**
	 * 비밀번호 찾기 폼
	 */
	@GetMapping("/auth/findPassword")
	public String findPassWord() {
		return "auth/findPassword";
	}
	
	/**
	 * 비밀번호 찾기
	 * @param email
	 * @throws MessagingException 
	 * @throws MailParseException 
	 */
	@PostMapping("/auth/findPassword")
	public ResponseEntity<Object> findPassword(String email) {
		
		HashMap<String, String> result = new HashMap<>();
		result.put("email", email);
		
		try {
			resetPasswordService.sendPasswordResetLink(email);
		} catch(MailParseException e) {
			log.debug("MailParseException :::" + e);
			return new ResponseEntity<> (result, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (MessagingException e) {
			log.debug("MessagingException :::" + e);
			return new ResponseEntity<> (result, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<> (result, HttpStatus.OK);
	}
	
	/**
	 * 비밀번호 변경 폼
	 * @param token
	 * @return
	 * @throws SignatureException
	 */
	@GetMapping("/auth/resetPassword")
	public ModelAndView resetPassword(String token, String email, HttpServletRequest request) throws JwtException {
		ModelAndView mav = new ModelAndView();
		
		// 외부에서 경로에 경우 csrf토큰 값 return;
		CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
		mav.addObject("_csrf", csrf);

		byte[] emailBytes = Base64.getDecoder().decode(email);
        String decodeEmail = new String(emailBytes);
        mav.addObject("email", decodeEmail);
        
        UserEntity userEntity = userRepository.findByEmail(decodeEmail);
        String secret = userEntity.getSecret();
        
		try {
			tokenProvider.getClaimsFromToken(token, secret);
			mav.setViewName("auth/resetPassword");
		}catch(ExpiredJwtException e) { // Token이 만료된 경우 | 변조된 경우
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
	    }
        
		return mav;
	}
	
	/**
	 * 비밀번호 변경
	 * @param signUpReq
	 * @param errors
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/auth/resetPassword")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> resetPassword(@Validated UserDto.ResetPasswordReq resetPasswordReq, Errors errors) throws Exception {

		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		
		// 계정 조회
		UserEntity userEntity = userRepository.findByEmail(resetPasswordReq.getEmail());
		
	    if(userEntity == null) {
	    	throw new UsernameNotFoundException(ErrorCode.USERNOTFOUND.getErrMsg());
	    }
	    
	    userEntity.updatePassword(resetPasswordReq.getPassword());
	    
	    userService.savePassword(userEntity);
	    return ApiResponse.toOkResponseEntity();
	    
	}
}
