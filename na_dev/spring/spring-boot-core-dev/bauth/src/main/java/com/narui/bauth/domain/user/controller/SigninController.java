package com.narui.bauth.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ParamException;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class SigninController {

  private final UserService userService;

  /**
   * 인증수단 선택 화면
   */
  @GetMapping("/auth/identifier")
  public String identifier() {
    log.debug("identifier");

    return "auth/identifier";
  }

  /**
   * Email 인증 화면
   */
  @GetMapping("/auth/identifierByEmail")
  public String email() {
    return "auth/identifierByEmail";
  }

  /**
   * 비밀번호 로그인 화면
   */
  @GetMapping("/auth/challengePwd")
  public String challengePwd() {
    return "auth/challengePwd";
  }

  /**
   * Totp 로그인폼
   */
  @GetMapping("/private/view/auth/challengeTotp")
  public String challengeTotp() {
    return "auth/challengeTotp";
  }

  /**
   * 계정 조회
   */
  @Operation(summary = "계정 조회")
  @PostMapping("/auth/accountlookup")
  public ResponseEntity<ApiResponse<UserDto.AccountLookupRes>> accountlookup(
          @Validated UserDto.AccountLookupReq accountLookupReq, Errors errors) throws Exception {
    if (errors.hasErrors()) {
      throw new ParamException(errors);
    }

    UserDto.AccountLookupRes accountLookupRes = userService.accountlookup(accountLookupReq);

    // return CmResponse.toOkResponseEntity(accountLookupRes); //Swagger 에서 data schema 안보임
    return ApiResponse.toOkResponseEntity(accountLookupRes);
  }

}
