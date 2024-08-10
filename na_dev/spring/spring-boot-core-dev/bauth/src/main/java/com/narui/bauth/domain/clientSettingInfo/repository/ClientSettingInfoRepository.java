package com.narui.bauth.domain.clientSettingInfo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;

public interface ClientSettingInfoRepository extends JpaRepository<ClientSettingInfoEntity, String>{
	Optional<ClientSettingInfoEntity> findByClientEntity(ClientEntity clientEntity);
}
