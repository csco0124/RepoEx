package com.narui.bauth.domain.demo.controller;

import java.awt.image.BufferedImage;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.narui.bauth.domain.config.dto.ConfigDto;
import com.narui.bauth.domain.config.service.ConfigService;
import com.narui.bauth.domain.demo.service.DemoService;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.service.UserService;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;
import com.narui.common.api.ApiException;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ParamException;
import com.narui.common.util.HttpUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DemoController {

  private final UserService userService;
  
  private final ConfigService configService;

  private final PrincipalUtil principalUtil;
  
  private final DemoService demoService;
  
  private static final String LoginConfigId = "login_config";
  
  public DemoController(UserService userService, ConfigService configService, PrincipalUtil principalUtil, DemoService demoService) {
	this.userService = userService;
	this.configService = configService;
	this.principalUtil = principalUtil;
	this.demoService = demoService;
  }

//  @GetMapping("/")
//  public String index(HttpServletRequest request, Principal principal) {
//    log.debug(HttpUtil.getRequestInfo(request));
//    return "index";
//  }

  @GetMapping("/public/demo")
  public String demo(HttpServletRequest request, Principal principal) {

    log.debug(HttpUtil.getRequestInfo(request));
    return "demo";
  }

  // 500 TEST용
  @Deprecated
  @GetMapping("/public/view/500")
  public String p500(Principal principal) throws Exception {
    throw new ApiException("강제 500 발생");
  }

  @Deprecated
  @GetMapping("/public/api/500")
  @ResponseBody
  public ResponseEntity<ApiResponse<String>> a500(Principal principal) throws Exception {
    throw new ApiException("강제 500 발생");
  }

  // 403 TEST용
  @Deprecated
  @GetMapping("/private/view/403")
  public String p403(HttpServletRequest request, Principal principal) throws Exception {
    log.debug(HttpUtil.getRequestInfo(request));
    return "demo";
  }

  @Deprecated
  @GetMapping("/private/api/403")
  public ResponseEntity<ApiResponse<String>> a403(HttpServletRequest request, Principal principal) throws Exception {
    log.debug(HttpUtil.getRequestInfo(request));
    return ApiResponse.toOkResponseEntity("return data");
  }

  // 401 TEST용
  @Deprecated
  @GetMapping("/private/view/401")
  public String p401(HttpServletRequest request, Principal principal) throws Exception {
    log.debug(HttpUtil.getRequestInfo(request));
    return "demo";
  }

  @Deprecated
  @GetMapping("/private/api/401")
  public ResponseEntity<ApiResponse<String>> a401(HttpServletRequest request, Principal principal) throws Exception {
    log.debug(HttpUtil.getRequestInfo(request));
    return ApiResponse.toOkResponseEntity("return data");
  }

   /**
   * AuthServer에서 직접 접근한 경우 로그인 폼
   */
  @GetMapping("/public/view/auth/login")
  public String loginByIdPass() {
    log.debug("loginByIdPass");

    //return "auth/loginByIdPassCsrf";
    return "auth/demo/loginByIdPassCsrf2step";
  }

  /**
   * OAuth를 통해 접근한경우 로그인 폼
   */
  @GetMapping("/public/view/auth/loginOAuth")
  public String loginByIdPassOAuth() {
    log.debug("loginByIdPassOAuth");

    return "auth/loginByIdPassOAuthCsrf";
  }

  /**
   * 회원 가입 양식
   */
  @Deprecated
  @GetMapping("/public/view/auth/registration")
  public String registration() {
    log.debug("registration");

    return "auth/demo/registration";
  }

  /**
   * Totp 로그인폼
   */
//  @GetMapping("/private/view/auth/challengeTotp")
//  public String challengeTotp() {
//    return "auth/demo/challengeTotp";
//  }

  /**
   * 회원 가입 처리
   */
  @Deprecated
  @PostMapping("/public/api/auth/registration")
  public ResponseEntity<ApiResponse<String>> signup(@Validated UserDto.SignUpReq signUpReq,
                                                    Errors errors) throws Exception {
    if (errors.hasErrors()) {
      throw new ParamException(errors);
    }
    userService.insertUser(signUpReq);
    return ApiResponse.toOkResponseEntity("ok");
  }

  /**
   * 로그인한 사용자 2FA 등록을 위한 qrcode 생성
   */
  @GetMapping(value = "/private/api/qrcode1", produces = MediaType.IMAGE_PNG_VALUE)
  public ResponseEntity<BufferedImage> qcode(@AuthenticationPrincipal MultiFactorUserDetails user)
      throws Exception {
    return new ResponseEntity<>(generateQRcode(user, 200), HttpStatus.OK);
  }

  /**
   * otp 용 qrocde 생성
   */
  public BufferedImage generateQRcode(MultiFactorUserDetails user, int qrsize)
      throws UnsupportedEncodingException, WriterException {

    String APP_NAME = "BAUTH";

    // @formatter:off
    String content = "otpauth://totp/"
        + URLEncoder.encode(APP_NAME + ":" + user.getEmail(), "UTF-8").replace("+", "%20")
        + "?secret="
        + URLEncoder.encode(user.getSecret(), "UTF-8").replace("+", "%20")
        + "&issuer="
        + URLEncoder.encode(APP_NAME, "UTF-8").replace("+", "%20");
    // @formatter:on

    QRCodeWriter qrCodeWriter = new QRCodeWriter();
    BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, qrsize, qrsize);
    BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

    return bufferedImage;
  }

  @GetMapping("/cmm/sessionChk")
  public ResponseEntity<Map<String, Object>> sschk() {
      UserDetails user = principalUtil.getPrincipal();
      Map<String, Object> result = new HashMap<>();

      //default is not authenticated
      result.put("isAuthenticated", false);
      result.put("authorities", Collections.EMPTY_LIST);

      //is authenticated
      if (user != null) {
          List<String> authorities = user.getAuthorities().stream()
                  .map(GrantedAuthority::getAuthority)
                  .collect(Collectors.toList());

          result.put("isAuthenticated", true);
          result.put("authorities", authorities);
          result.put("userName", user.getUsername()); // 이메일
          //result.put("user", user); // 추가 정보
          return ResponseEntity.ok(result);
      }
      
      return ResponseEntity.ok(result);
  }
  
  @GetMapping("cmm/config/login")
  public ResponseEntity<ApiResponse<ConfigDto.ConfigResDto>> findLoginConfig() {
	  ConfigDto.ConfigResDto configResDto = configService.findConfigById(LoginConfigId);
	  return ApiResponse.toOkResponseEntity(configResDto);
  }
  
  @PostMapping("/public/api/otp-auth")
  @ResponseBody
  public Map<String, String> authenticatedController(@RequestBody UserDto.SignUpReq user) throws Exception {
    String content = demoService.authenticateByOtp(user.getEmail(), user.getPassword());
    
    Map<String, String> jsonContent = new HashMap<>();
    
    jsonContent.put("content", content);
    
    return jsonContent;
  }
}
