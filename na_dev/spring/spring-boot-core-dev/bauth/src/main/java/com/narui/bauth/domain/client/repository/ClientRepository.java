package com.narui.bauth.domain.client.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;

import com.narui.bauth.domain.client.entity.ClientEntity;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<ClientEntity, String>, JpaSpecificationExecutor<ClientEntity>{

	Optional<ClientEntity> findByClientId(String clientId);

    List<ClientEntity> findByOwner(String ownerName);

    @Override
	@EntityGraph(attributePaths = { "clientSettingInfo" }, type = EntityGraph.EntityGraphType.LOAD)
    Page<ClientEntity> findAll(@Nullable Specification<ClientEntity> spec, Pageable pageable);

    Optional<ClientEntity> findById(String id);
}
