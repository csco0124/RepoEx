package com.narui.bauth.domain.clientAuthority.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;

public interface ClientAuthorityRepository extends JpaRepository<ClientAuthorityEntity, Long>{
	
	List<ClientAuthorityEntity> findByUserEntity_Id(Long userId);
	
	void deleteByUserEntity_Id(Long userId);

	Page<ClientAuthorityEntity> findAll(Specification<ClientAuthorityEntity> spec, Pageable pageable);
}
