package com.narui.bauth.global.mfa.authentication;

import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;

/**
 * MFA 인증 처리 (google otp)
 */
@Component
public class MultiFactorAuthenticationDetailsSource
    implements AuthenticationDetailsSource<HttpServletRequest, MultiFactorAuthenticationDetails> {

  @Override
  public MultiFactorAuthenticationDetails buildDetails(HttpServletRequest request) {

    return MultiFactorAuthenticationDetails.builder()
        .verificationCode(request.getParameter("verificationCode")).build();
  }
}
