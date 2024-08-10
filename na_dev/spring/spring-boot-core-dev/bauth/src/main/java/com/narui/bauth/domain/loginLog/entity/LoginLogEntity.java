package com.narui.bauth.domain.loginLog.entity;

import org.hibernate.annotations.Comment;

import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@Entity
@Table(name = "`login_log`")
public class LoginLogEntity extends BaseTimeEntity{
	
	@Comment("시퀀스")
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "login_log_seq")
	private Long id;
	
	@Comment("로그인 이메일")
	@Size(max = 100)
	private String email;
	
	@Comment("로그인 타입(S : 로그인 성공, F : 로그인 실패)")
	@NotNull
	@Size(max = 10)
	private String type;
	
	@Comment("응답 상태코드")
	@NotNull
	private Integer statusNum;
	
	@Comment("로그인 실패 에러 메시지")
	@Size(max = 1000)
	private String errMsg;
	
	@Comment("로그인 경로")
	@Size(max = 30)
	private String loginChannel;
	
	public LoginLogEntity() {
	}

	@Builder
	public LoginLogEntity(Long id, String email, String type, Integer statusNum, String errMsg, String loginChannel) {
		this.id = id;
		this.email = email;
		this.type = type;
		this.statusNum = statusNum;
		this.errMsg = errMsg;
		this.loginChannel = loginChannel;
	}
	
}
