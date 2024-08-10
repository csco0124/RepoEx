package com.narui.bauth.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.io.Serializable;
import java.sql.Timestamp;

@SuperBuilder
@Getter
@Entity
@NoArgsConstructor
@Table(name="phone")
public class PhoneEntity implements Serializable {
  
  private static final long serialVersionUID = 1L;

  @Id
  private Long id;
  
  @OneToOne(optional = false)
  @MapsId // primary key copied from user
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private UserEntity user;

  @Size(max = 20)
  private String phone;
  
  @Size(max = 6)
  private String verificationCode;
  
  private boolean verified;
  
  private Timestamp lastChallenge;
    
  public void updateVerified(boolean verified) {
    this.verified = verified;
  }
  
  /**
   * 전화번호 변경시 확인상태 초기화
   */
  public void updatePhone(String phone, String verificationCode) {
    this.phone = phone;
    this.verificationCode = verificationCode;
    this.verified = false;
    this.lastChallenge = new Timestamp(System.currentTimeMillis());    
  }
  public void updatePhoneNum(String phone) {
	  this.phone = phone;
	  this.lastChallenge = new Timestamp(System.currentTimeMillis());    
  }
}
