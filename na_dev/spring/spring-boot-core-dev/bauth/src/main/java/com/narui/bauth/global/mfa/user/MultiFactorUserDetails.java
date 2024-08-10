package com.narui.bauth.global.mfa.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.UserDetails;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

/**
 * 필드 수정시 MultiFactorUserDetailsDeserializer 도 수정 해야함
 * @see MultiFactorUserDetailsDeserializer
 * */
@Getter
@Setter
public class MultiFactorUserDetails implements UserDetails, CredentialsContainer {

  private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

  private Long id;
  private String nickname;

  private String phone;

  //2FA
  private boolean using2FA;
  private String secret;
  private Timestamp lastChallenge;

  //스프링 시큐리티 변수
  private String email;
  private String password;
  private boolean enabled;
  private boolean accountNonExpired;
  private boolean accountNonLocked;
  private boolean credentialsNonExpired;
  private List<? extends GrantedAuthority> authorities;
  private String kakaoKey;
  private String naverKey;
  private String googleKey;

  @Builder
  public MultiFactorUserDetails(
          Long id,
          String nickname,
          String phone,
          boolean using2FA,
          String secret,
          Timestamp lastChallenge,
          String email,
          String password,
          boolean enabled,
          boolean accountNonExpired,
          boolean accountNonLocked,
          boolean credentialsNonExpired,
          List<? extends GrantedAuthority> authorities,
          String kakaoKey,
          String naverKey,
          String googleKey
  ) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.using2FA = using2FA;
    this.secret = secret;
    this.lastChallenge = lastChallenge;
    this.password = password;
    this.enabled = enabled;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.credentialsNonExpired = credentialsNonExpired;
    this.authorities = authorities;
    this.kakaoKey = kakaoKey;
    this.naverKey = naverKey;
    this.googleKey = googleKey;
  }

  @Override
  public void eraseCredentials() {
    this.password = null;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return accountNonExpired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return accountNonLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return credentialsNonExpired;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }
}
