package com.narui.bauth.domain.resetPassword.entity;

import java.sql.Timestamp;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "reset_password")
@Getter
@NoArgsConstructor
public class ResetPasswordEntity {
	@Schema(description = "아이디")
	@Column(name = "id")
	@Id
	private String id;
	@Schema(description = "이메일")
	@Column(name = "email")
	private String email;
	@Schema(description = "해당 컬럼 만료 시간")
	@Column(name = "expired_date")
	private Timestamp expiredDate;

	@Builder
	public ResetPasswordEntity(String id, String email, Timestamp expiredDate) {
		this.id = id;
		this.email = email;
		this.expiredDate = expiredDate;
	}
}
