package com.narui.bauth.global.oauth2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.narui.bauth.global.oauth2.entity.AuthorizationEntity;

public interface AuthorizationRepository extends JpaRepository<AuthorizationEntity, String>{

    Optional<AuthorizationEntity> findByState(String state);
	Optional<AuthorizationEntity> findByAuthorizationCodeValue(String authorizationCode);
	Optional<AuthorizationEntity> findByAccessTokenValue(String accessToken);
	Optional<AuthorizationEntity> findByRefreshTokenValue(String refreshToken);
	@Query("select a from AuthorizationEntity a where a.state = :token" +
			" or a.authorizationCodeValue = :token" +
			" or a.accessTokenValue = :token" +
			" or a.refreshTokenValue = :token"
	)
	Optional<AuthorizationEntity> findByStateOrAuthorizationCodeValueOrAccessTokenValueOrRefreshTokenValue(@Param("token") String token);
	
	@Query(value = "delete from oauth2_authorization where coalesce(access_token_expires_at, 9999-12-31) < :value", nativeQuery = true)
	void deleteByAccessTokenExpiresAt(@Param(value = "value") String value);
	
	@Query(value = "OPTIMIZE TABLE oauth2_authorization", nativeQuery = true)
	List<Object> optimizeOauth2Authorization();
}
