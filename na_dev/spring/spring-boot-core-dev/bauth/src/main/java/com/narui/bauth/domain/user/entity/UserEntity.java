package com.narui.bauth.domain.user.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;
import com.narui.common.vali.ValidEmail;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

/**
 * 사용자 Entity
 */

//DB의 테이블과 1:1로 매핑
//Entity에서는 setter 메서드의 사용을 지양
@Getter
@Entity
@Table(name="user")
public class UserEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
  private Long id;

  @ValidEmail
  @NotNull
  @Size(max = 50)
  private String email;
  
  @OneToOne(mappedBy = "user")
  private PhoneEntity phone; 
  
  //2FA
  private boolean using2FA;
  @Size(max = 20)
  private String secret;
  
  private Timestamp lastChallenge; //최종 로그인한 일시
  
  //social auth key
  @Size(max = 50)
  private String kakaoKey;
  @Size(max = 50)
  private String naverKey;
  @Size(max = 50)
  private String googleKey;

  //스프링 시큐리티 변수

  @NotNull
  @Size(max = 50)
  private String nickname;
  @Size(max = 80)
  private String password;
  @NotNull
  private boolean enabled;
  @NotNull
  private boolean accountNonExpired;
  @NotNull
  private boolean accountNonLocked;
  @NotNull
  private boolean credentialsNonExpired;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
  private Set<AuthorityEntity> authorities;
 
  // webauthn
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)  
  private Set<AuthenticatorEntity> authenticators; 

  // client server side authority
  @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<ClientAuthorityEntity> clientAuthorities;
  
  public UserEntity() {
  }

  @Builder
  public UserEntity(
          Long id,
          String email,
          PhoneEntity phone,
          boolean using2FA,
          String secret,
          Timestamp lastChallenge,
          String nickname,
          String password,
          boolean enabled,
          boolean accountNonExpired,
          boolean accountNonLocked,
          boolean credentialsNonExpired,
          Set<AuthorityEntity> authorities,
          Set<AuthenticatorEntity> authenticators,
          Set<ClientAuthorityEntity> clientAuthorities,
          String kakaoKey,
          String naverKey,
          String googleKey
  ) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.using2FA = using2FA;
    this.secret = secret;
    this.lastChallenge = lastChallenge;
    this.nickname = nickname;
    this.password = password;
    this.enabled = enabled;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.credentialsNonExpired = credentialsNonExpired;
    this.authorities = authorities;
    this.authenticators = authenticators;
    this.clientAuthorities = clientAuthorities;
    this.kakaoKey = kakaoKey;
    this.naverKey = naverKey;
    this.googleKey = googleKey;
  }
  
  public void updateId(Long id) {
    this.id = id;
  }
  
  public void updateEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public void updateAccountNonLocked(boolean accountNonLocked) {
    this.accountNonLocked = accountNonLocked;
  }
  
  public void updatePassword(String password) {
    this.password = password;
  }

  public void updateNickname(String nickname) {
    this.nickname = nickname;
  }
  
  public void updateLastChallenge(Timestamp lastChallenge) {
    this.lastChallenge = lastChallenge;
  }
  
  public void updateUsing2FA(boolean using2FA) {
	  this.using2FA = using2FA;
  }
  
  public void updateKakaoKey(String kakaoKey) {
	  this.kakaoKey = kakaoKey;
  }
  
  public void updateNaverKey(String naverKey) {
	  this.naverKey = naverKey;
  }
  
  public void updateGoogleKey(String googleKey) {
	  this.googleKey = googleKey;
  }
  
  public void updateAuthorities(Set<AuthorityEntity> authorities) {
	  this.authorities = authorities;
  }
  
  public void updateSecret(String secret) {
	  this.secret = secret;
  }
}
