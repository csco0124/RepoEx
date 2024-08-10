package com.narui.bauth.domain.verifySocial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.verifySocial.dto.VerifySocialDto;
import com.narui.bauth.domain.verifySocial.service.VerifySocialService;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ParamException;
import com.webauthn4j.util.Base64UrlUtil;

import io.swagger.v3.oas.annotations.Operation;

@RestController
public class VerifyWebauthnController {
	@Autowired
	private VerifySocialService verifySocialService;
	private UserRepository userRepository;
	
	public VerifyWebauthnController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Operation(summary = "webauth 등록에 필요한 사용자 정보를 가져오는 ")
	@GetMapping("/auth/api/webauthn/profile")
    public ResponseEntity<ApiResponse<UserDto.ProfileForm>> webauthnProfile(@RequestParam Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);

        return ApiResponse.toOkResponseEntity(
                UserDto.ProfileForm.builder()
                        .userHandle(Base64UrlUtil.encodeToString(userEntity.getEmail().getBytes()))
                        .email(userEntity.getEmail())
                        .username(userEntity.getNickname())
                        .build()
        );
    }
	
	/**
	 * 소셜 등록을 위한 휴대폰 인증 step(1/2)
	 */
	@Operation(summary = "소셜 휴대폰 인증 step(1/2)")
	@PostMapping("/auth/api/webauthn/webgradsidvphone")
	public ResponseEntity<ApiResponse<Long>> webgradsidvphone(
			@Validated VerifySocialDto verifySocialDto, Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		//DB에 휴대폰 번호 저장하고 random 6자리 숫자 발생시켜서 SMS 전송하기
		Long result = verifySocialService.verifyPhoneStep1(verifySocialDto, "webauthn");
		
		return ApiResponse.toOkResponseEntity(result);
	}
	
	/**
	 * 소셜 등록을 위한 휴대폰 인증 step(1/2)
	 */
	@Operation(summary = "소셜 휴대폰 인증 step(2/2)") 
	@PostMapping("/auth/api/webauthn/webgradsidvverify")
	public ResponseEntity<ApiResponse<VerifySocialDto>> webgradsidvverify(
			@Validated VerifySocialDto verifySocialDto, Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		//인증코드 확인후 사용자 계정활성화처리
		VerifySocialDto result = verifySocialService.verifyPhoneStep2(verifySocialDto, "webauthn");
		
		return ApiResponse.toOkResponseEntity(result);
	}
	
	/**
	* 계정 생성 처리
	*/
	
	@Operation(summary = "소셜 계정 생성")
	@PostMapping("/auth/api/webauthn/webcreateaccount/{id}")
	public ResponseEntity<ApiResponse<VerifySocialDto>> webcreateaccount(
		      @Validated UserDto.SignUpSocialReq signUpReq, @PathVariable(name = "id") Long id , Errors errors) throws Exception {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}
		// 계정 추가
		VerifySocialDto result = verifySocialService.insertUser(signUpReq, id, "webauthn");
	
		return ApiResponse.toOkResponseEntity(result);
	}
}
