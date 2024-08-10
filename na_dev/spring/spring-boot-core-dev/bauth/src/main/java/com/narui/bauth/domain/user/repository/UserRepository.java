package com.narui.bauth.domain.user.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.narui.bauth.domain.user.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {

	@EntityGraph(attributePaths = { "authenticators" }, type = EntityGraph.EntityGraphType.LOAD)
	Optional<UserEntity> findWithAuthenticatorsById(Long id);

	@EntityGraph(attributePaths = { "authorities" }, type = EntityGraph.EntityGraphType.LOAD)
	Optional<UserEntity> findWithAuthoritiesById(Long id);

	@EntityGraph(attributePaths = { "authorities" }, type = EntityGraph.EntityGraphType.LOAD)
	UserEntity findWithAuthoritiesByEmail(String email);

	// user 만 가져오고 나머지 LAZY
	UserEntity findByEmail(String email);
	
	Optional<UserEntity> findById(Long id);

	// phone 까지 join해서 가져옴
	@EntityGraph(attributePaths = { "phone" }, type = EntityGraph.EntityGraphType.LOAD)
	UserEntity findWithPhoneByEmail(String email);

	// authenticators 까지 join해서 가져옴 for webauthn
	@EntityGraph(attributePaths = { "authenticators", "authorities", "clientAuthorities" }, type = EntityGraph.EntityGraphType.LOAD)
	UserEntity findWithAuthenticatorsByEmail(String email);

	// void save(SignUpReq signUpReq);

	@EntityGraph(attributePaths = { "authorities" }, type = EntityGraph.EntityGraphType.LOAD)
	Optional<UserEntity> findWithAuthoritiesByKakaoKey(String kakaoKey);

	@EntityGraph(attributePaths = { "authorities" }, type = EntityGraph.EntityGraphType.LOAD)
	Optional<UserEntity> findWithAuthoritiesByNaverKey(String naverKey);

	@EntityGraph(attributePaths = { "authorities" }, type = EntityGraph.EntityGraphType.LOAD)
	Optional<UserEntity> findWithAuthoritiesByGoogleKey(String googleKey);

	// 소셜/생체인증 사용자 조회
	@EntityGraph(attributePaths = { "authenticators" }, type = EntityGraph.EntityGraphType.LOAD)
	Page<UserEntity> findAll(Specification<UserEntity> spec, Pageable pageable);
}
