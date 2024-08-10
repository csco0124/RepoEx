package com.narui.bauth.domain.webauthn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;

public interface AuthenticatorEntityRepository extends JpaRepository<AuthenticatorEntity, Long> {

    @EntityGraph(attributePaths = {"user","user.authorities","user.clientAuthorities"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<AuthenticatorEntity> findByAttestedCredentialData_CredentialId(@Param("credentialId") byte[] credentialId);

    /**
     * user_id 값에 맞는 데이터 추출
     */
//	List<AuthenticatorEntity> findByUser_Id(String userId);
}
