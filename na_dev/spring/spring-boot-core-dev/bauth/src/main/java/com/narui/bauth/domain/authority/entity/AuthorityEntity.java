package com.narui.bauth.domain.authority.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.io.Serializable;

/**
 * 사용자 권한 Entity
 */
@Getter
@Entity
@NoArgsConstructor
@Table(name="authority")
public class AuthorityEntity extends BaseTimeEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq")
  private Long id;

  @NotNull
  @Size(max = 20)
  private String authority;

  @ManyToOne  
  @NotNull // FK
  @JoinColumn(name = "user_id") // FK
  @JsonIgnore
  private UserEntity user;
  
  @Builder
  public AuthorityEntity(Long id, String authority, UserEntity user) {
	  this.id = id;
	  this.authority = authority;
	  this.user = user;
  }
  
  public void updateAuthority(String authority) {
	  this.authority = authority;
  }
  
  public void updateUser(UserEntity user) {
	  this.user = user;
  }
  
}
