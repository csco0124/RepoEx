package com.narui.bauth.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.common.api.ParamException;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class SignupController {

  private final UserService userService;

  /**
   * 계정 생성 처리
   */
  @Operation(summary = "계정 생성")
//  @PostMapping("/auth/webcreateaccount")
  @PostMapping("/public/api/webcreateaccount")
  public ResponseEntity<ApiResponse<UserDto.AccountLookupRes>> webcreateaccount(
          @Validated UserDto.SignUpReq signUpReq, Errors errors) throws Exception {
    if (errors.hasErrors()) {
      throw new ParamException(errors);
    }
    // 계정 추가
    userService.insertUser(signUpReq);
    // 계정 조회
    UserDto.AccountLookupRes accountLookupRes =
            userService.accountlookup(new UserDto.AccountLookupReq(signUpReq.getEmail()));

    return ApiResponse.toOkResponseEntity(accountLookupRes);
  }

  /**
   * 휴대폰 인증 step(1/2)
   */
  @Operation(summary = "휴대폰 인증 step(1/2)")
//  @PostMapping("/auth/webgradsidvphone")
  @PostMapping("/public/api/webgradsidvphone")
  public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> webgradsidvphone(
          @Validated UserDto.VerifyPhoneReq verifyPhoneReq, Errors errors) throws Exception {
    if (errors.hasErrors()) {
      throw new ParamException(errors);
    }
    //DB에 휴대폰 번호 저장하고 random 6자리 숫자 발생시켜서 SMS 전송하기
    userService.verifyPhoneStep1(verifyPhoneReq);

    return ApiResponse.toOkResponseEntity();
  }

  /**
   * 휴대폰 인증 step(1/2)
   */
  @Operation(summary = "휴대폰 인증 step(2/2)")
//  @PostMapping("/auth/webgradsidvverify")
  @PostMapping("/public/api/webgradsidvverify")
  public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> webgradsidvverify(
          @Validated UserDto.VerifyCodeReq verifyCodeReq, Errors errors) throws Exception {
    if (errors.hasErrors()) {
      throw new ParamException(errors);
    }
    //인증코드 확인후 사용자 계정활성화처리
    userService.verifyPhoneStep2(verifyCodeReq);

    return ApiResponse.toOkResponseEntity();
  }

}
