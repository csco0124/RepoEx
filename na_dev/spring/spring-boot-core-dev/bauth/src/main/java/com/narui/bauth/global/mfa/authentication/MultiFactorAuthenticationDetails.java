package com.narui.bauth.global.mfa.authentication;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MultiFactorAuthenticationDetails implements Serializable { 
 
  private static final long serialVersionUID = 1L;
  
  private  String verificationCode;
}
