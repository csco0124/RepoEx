package com.narui.bauth.domain.verifySocial.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.common.api.ParamException;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.verifySocial.dto.VerifySocialDto;
import com.narui.bauth.domain.verifySocial.service.VerifySocialService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class VerifySocialController {
	@Autowired
	private VerifySocialService verifySocialService;
	
	/**
	 * 소셜 등록을 위한 휴대폰 인증 화면
	 */
	@GetMapping("/auth/webgradsidvphonesocial")
	public String webgradsidvphonsocial() {
		  return "auth/webgradsidvphonesocial";
	}
	
	@GetMapping("/auth/webcreateaccountsocial")
	public String webcreateaccountsocial() {
		return "auth/webcreateaccountsocial";
	}
	
	@Operation(summary = "해당 소셜로 로그인 할 수 있는 페이지로 이동 혹은 redirect")
	@PostMapping(value = "/auth/api/social/login/{socialName}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> socialRedirect(HttpServletResponse response,
			@PathVariable(value = "socialName") String socialName) throws IOException{
		String loginUri = "/oauth2/authorization/";
		response.sendRedirect(loginUri + socialName);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "verifySocial 단일 정보 가져오기")
	@GetMapping("/auth/api/verify-social/{id}")
	public ResponseEntity<ApiResponse<VerifySocialDto>> getVerifySocial(@PathVariable(value = "id") String Id){
		VerifySocialDto result = verifySocialService.getVerifySocial(Long.parseLong(Id));
		return ApiResponse.toOkResponseEntity(result);
	}
	
	/**
	 * 소셜 등록을 위한 휴대폰 인증 step(1/2)
	 */
	@Operation(summary = "소셜 휴대폰 인증 step(1/2)")
	@PostMapping("/auth/api/social/webgradsidvphone")
	public ResponseEntity<ApiResponse<Long>> webgradsidvphone(
			@Validated VerifySocialDto verifySocialDto, Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		//DB에 휴대폰 번호 저장하고 random 6자리 숫자 발생시켜서 SMS 전송하기
		//return: verifySocial의 id
		Long result = verifySocialService.verifyPhoneStep1(verifySocialDto, "social");
		
		return ApiResponse.toOkResponseEntity(result);
	}
	
	/**
	 * 소셜 등록을 위한 휴대폰 인증 step(1/2)
	 */
	@Operation(summary = "소셜 휴대폰 인증 step(2/2)") 
	@PostMapping("/auth/api/social/webgradsidvverify")
	public ResponseEntity<ApiResponse<VerifySocialDto>> webgradsidvverify(
			@Validated VerifySocialDto verifySocialDto, Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		//인증코드 확인후 사용자 계정활성화처리
		VerifySocialDto result = verifySocialService.verifyPhoneStep2(verifySocialDto, "social");
		
		return ApiResponse.toOkResponseEntity(result);
	}
	
	/**
	* 계정 생성 처리
	*/
	
	@Operation(summary = "소셜 계정 생성")
	@PostMapping("/auth/api/social/webcreateaccount/{id}")
	public ResponseEntity<ApiResponse<VerifySocialDto>> webcreateaccount(
		      @Validated UserDto.SignUpSocialReq signUpReq, @PathVariable(name = "id") Long id , Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		// 계정 추가
		VerifySocialDto result = verifySocialService.insertUser(signUpReq, id, "social");
	
		return ApiResponse.toOkResponseEntity(result);
	}
}
