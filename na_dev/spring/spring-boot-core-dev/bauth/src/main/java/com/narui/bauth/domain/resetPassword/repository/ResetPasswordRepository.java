package com.narui.bauth.domain.resetPassword.repository;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.narui.bauth.domain.resetPassword.entity.ResetPasswordEntity;

public interface ResetPasswordRepository  extends JpaRepository<ResetPasswordEntity, String>{
	void deleteById(String id);
	
	@Query("select current_timestamp")
	Timestamp getCurrentTime();
}
