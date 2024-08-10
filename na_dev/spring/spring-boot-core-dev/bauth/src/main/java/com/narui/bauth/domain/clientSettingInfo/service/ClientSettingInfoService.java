package com.narui.bauth.domain.clientSettingInfo.service;

import java.io.File;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.client.repository.ClientRepository;
import com.narui.bauth.domain.clientSettingInfo.dto.ClientSettingInfoDto;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;
import com.narui.bauth.domain.clientSettingInfo.repository.ClientSettingInfoRepository;

@Service
public class ClientSettingInfoService {
	private ClientSettingInfoRepository clientSettingInfoRepository;
	private ClientRepository clientRepository;
	
	public ClientSettingInfoService(ClientSettingInfoRepository clientSettingInfoRepository, ClientRepository clientRepository) {
		this.clientSettingInfoRepository = clientSettingInfoRepository;
		this.clientRepository = clientRepository;
	}
	
	
	@Transactional
	public ClientSettingInfoDto getClientsettingInfo(String clientId) {
		ClientEntity clientEntity = clientRepository.findByClientId(clientId).orElse(null);
		ClientSettingInfoEntity clientSettingInfoEntity = clientSettingInfoRepository.findByClientEntity(clientEntity).orElse(null);
		ClientSettingInfoDto clientSettingInfoDto = clientSettinginfoEntityConvert(clientSettingInfoEntity);
		
		return clientSettingInfoDto;
	}
	
	@Transactional
	public void deleteClientSettingInfo(String registeredClientId) {
		ClientEntity clientEntity = clientRepository.findById(registeredClientId).orElse(null);
		ClientSettingInfoEntity entity = clientSettingInfoRepository.findByClientEntity(clientEntity).orElse(null);
		
		//clientSettingInfo 제거
		clientSettingInfoRepository.deleteById(entity.getId());
		
		//로고 이미지 제거
		if(entity.getLogoUri() != null) {
			File deleteFile = new File(entity.getLogoUri());
			deleteFile.delete();
		}
	}
	
	private ClientSettingInfoDto clientSettinginfoEntityConvert(ClientSettingInfoEntity entity) {
		if(Objects.equals(null, entity)) {
			return null;
		}
		
		return ClientSettingInfoDto.builder()
				.id(entity.getId())
				.baseUrl(entity.getBaseUrl())
				.homeUri(entity.getHomeUri())
				.logoUri(entity.getLogoUri())
				.build();
	}
}
