package com.narui.bauth.domain.verifySocial.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.verifySocial.entity.VerifySocialEntity;

public interface VerifySocialRepository extends JpaRepository<VerifySocialEntity, Long>{
	Optional<VerifySocialEntity> findBySecretKey(String secretKey);
}
