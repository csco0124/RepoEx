package com.narui.bauth.domain.socialAuth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.socialAuth.entity.SocialInfoEntity;

public interface SocialInfoRepository extends JpaRepository<SocialInfoEntity, Long>{
	List<SocialInfoEntity> findAll();
}
