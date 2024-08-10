package com.narui.bauth.global.mfa.authentication;

import com.narui.common.util.DateUtil;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.aerogear.security.otp.Totp;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.sql.Timestamp;
import java.util.Collections;

/**
 * MFA 인증 처리 (google otp)
 */
@RequiredArgsConstructor
@Slf4j
public class MultiFactorAuthenticationProvider extends DaoAuthenticationProvider {

  private static final GrantedAuthority PRE_AUTH = new SimpleGrantedAuthority("ROLE_PRE_AUTH");

  private final UserRepository userRepository;

  // TODO property 변수로 변경
  private final long authLimitMin = 1; // 인증시도 유효시간 min

  @Override
  public Authentication authenticate(Authentication auth) throws AuthenticationException {    

    MultiFactorUserDetails userDetails =  (MultiFactorUserDetails) this.getUserDetailsService().loadUserByUsername((auth.getName()));

    log.debug("MultiFactor 인증시도 {} ,2FA: {}", auth.getName(), userDetails.isUsing2FA());

    // 2FA 사용자인경우 otp 코드확인
    if (userDetails.isUsing2FA()) {

      final String verificationCode =
          ((MultiFactorAuthenticationDetails) auth.getDetails()).getVerificationCode();

      if (verificationCode == null || "".equals(verificationCode)) { // 1step
        // 비밀번호 확인
        Authentication result = super.authenticate(auth);
        // 인증성공 일시 저장
        updateLastChallenge(userDetails);
        // 1차인증 토큰발급
        return new UsernamePasswordAuthenticationToken(userDetails, result.getCredentials(),
            Collections.singleton(PRE_AUTH));
      } else { // 2stetp

        // 1차인증 체크
        checkPreAuth(userDetails);                
        // Totp 체크
        checkTotp(userDetails.getSecret(), verificationCode);
        // 인증토큰발급
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
        userDetails.getAuthorities());
      }
    } else {
      // 비밀번호 확인
      Authentication result = super.authenticate(auth);
      // 인증성공 일시 저장
      updateLastChallenge(userDetails);
      // 인증토큰발급
      return new UsernamePasswordAuthenticationToken(userDetails, result.getCredentials(),
          result.getAuthorities());
    }
  }
  
  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
  
  /**
   * 1차 인증 체크
   */
  private void checkPreAuth(MultiFactorUserDetails userDetails) {
    
      userRepository.findById(userDetails.getId()).ifPresentOrElse(userEntity -> {
        // 1차인증 후 n분이 지나면 오류로 처리
        if (userEntity.getLastChallenge() == null
          || DateUtil.minDiff(userEntity.getLastChallenge()) > authLimitMin) {
          throw new CredentialsExpiredException(this.messages.getMessage("InvalidPreAuth"));
        }
      },()-> {
        throw new CredentialsExpiredException(this.messages.getMessage("InvalidPreAuth"));
      });
  }

  /**
   * TOPT Check
   */
  private void checkTotp(String secret, String verificationCode) {
    final Totp totp = new Totp(secret);

    if (!isValidLong(verificationCode) || !totp.verify(verificationCode)) {
      throw new BadCredentialsException(this.messages.getMessage("InvalidVerificationCode"));
      // BadCredentialsException 을 throw 하면 1차인증까지 풀어짐. => DB 확인으로 대체
    }
  }

  private boolean isValidLong(String verificationCode) {
    try {
      Long.parseLong(verificationCode);
    } catch (final NumberFormatException e) {
      return false;
    }
    return true;
  }

  /**
   * 최종 로그인 일시 저장
   */
  private void updateLastChallenge(MultiFactorUserDetails userDetails) {    

    userRepository.findById(userDetails.getId()).ifPresent(userEntity -> {
      userEntity.updateLastChallenge(new Timestamp(System.currentTimeMillis()));
      userRepository.save(userEntity);      
    });
  }

}
