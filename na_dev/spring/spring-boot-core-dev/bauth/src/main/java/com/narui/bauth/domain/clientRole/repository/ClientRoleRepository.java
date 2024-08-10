package com.narui.bauth.domain.clientRole.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;

import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;

import io.lettuce.core.dynamic.annotation.Param;

public interface ClientRoleRepository extends JpaRepository<ClientRoleEntity, String>, JpaSpecificationExecutor<ClientRoleEntity>{
	
	@Override
	@EntityGraph(attributePaths = {"clientEntity"})
	Page<ClientRoleEntity> findAll(@Nullable Specification<ClientRoleEntity> spec, Pageable pageable);
	
	@EntityGraph(attributePaths = {"clientEntity"})
	List<ClientRoleEntity> findByclientEntity_Id(String clientId);
	
	@Query(value = "SELECT COUNT(authority) FROM ClientRoleEntity c WHERE c.authority = :authority")
	int getCnt(@Param("authority") String authority);
	
	ClientRoleEntity findByDefaultYnAndClientEntity_ClientId(String clientId, String defaultYn);
	
	boolean existsByAuthority(String authority);
	
}
