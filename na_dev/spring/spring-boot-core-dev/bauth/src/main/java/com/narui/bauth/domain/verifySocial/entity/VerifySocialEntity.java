package com.narui.bauth.domain.verifySocial.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;

import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "verify_social")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
/* 
 * 비로그인 상태에서 소셜 등록 or 소셜 회원가입을 하기 위한 정보를 담은 테이블
 */
public class VerifySocialEntity extends BaseTimeEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "verify_social_seq")
	private Long id;
	
	@Column(name = "phone", length = 11)
	private String phone;
	
	@Column(name = "verification_code", length = 6)
	private String verificationCode;
	
	@Column(name = "social_key", length = 50)
	private String socialKey;
	
	@Column(name = "social_name", length = 50)
	private String socialName;
	
	@Column(name = "user_id", length = 20)
	private Long userId;
	
	@Column(name = "client_id")
	private String clientId;
	
	@Column(name = "email", length = 50)
	private String email;
	
	@Column(name = "nickname", length = 50)
	private String nickname;
	
	@Column(name = "last_challenge")
	private Timestamp lastChallenge;
	
	@Column(name = "enabled")
	@ColumnDefault(value = "true")
	private boolean enabled; 
	
	@Column(name = "secret_key", unique = true, updatable = false, nullable = false)
	private String secretKey;
	
	public void updateEmail(String email) {
		this.email = email;
	}
	
	public void updateEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}
