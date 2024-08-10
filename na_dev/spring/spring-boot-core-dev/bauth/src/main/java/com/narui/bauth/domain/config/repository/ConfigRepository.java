package com.narui.bauth.domain.config.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.narui.bauth.domain.config.entity.ConfigEntity;

public interface ConfigRepository extends JpaRepository<ConfigEntity, String>, JpaSpecificationExecutor<ConfigEntity>{

}
