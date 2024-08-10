package com.narui.bauth.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.user.entity.PhoneEntity;

public interface PhoneRepository extends JpaRepository<PhoneEntity, Long> {
	PhoneEntity findByPhone(String phone);//error
}
