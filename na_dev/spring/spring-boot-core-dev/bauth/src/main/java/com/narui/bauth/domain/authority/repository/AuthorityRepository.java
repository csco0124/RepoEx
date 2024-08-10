package com.narui.bauth.domain.authority.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.user.entity.UserEntity;

public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Long> {
	Optional<AuthorityEntity> findByUser(UserEntity user);
	List<AuthorityEntity> findAll();
	Optional<AuthorityEntity> findById(Long id);
	void deleteById(Long id);
	void deleteByUserId(Long userId);
}
