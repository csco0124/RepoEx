package com.narui.bauth.domain.role.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.narui.bauth.domain.role.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, String>, JpaSpecificationExecutor<RoleEntity> {
	Optional<RoleEntity> findByAuthority(String authority);
	void deleteByAuthority(String authority);
	Optional<RoleEntity> findByDefaultYn(String defaultYn);
	boolean existsByAuthority(String authority);
	List<RoleEntity> findAllByDefaultYn(String defaultYn);
}
