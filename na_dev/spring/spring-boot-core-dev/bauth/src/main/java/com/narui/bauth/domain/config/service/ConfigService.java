package com.narui.bauth.domain.config.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.narui.bauth.domain.config.dto.ConfigDto.ConfigReqDto;
import com.narui.bauth.domain.config.dto.ConfigDto.ConfigResDto;
import com.narui.bauth.domain.config.entity.ConfigEntity;
import com.narui.bauth.domain.config.mapstruct.ConfigMsMapper;
import com.narui.bauth.domain.config.repository.ConfigRepository;

@Service
public class ConfigService {
	
	private ConfigRepository configRepository;
	
	public ConfigService(ConfigRepository configRepository) {
		this.configRepository  = configRepository;
	}

	public List<ConfigResDto> findConfigAll() {
		List<ConfigEntity> configEntities = configRepository.findAll();
		List<ConfigResDto> configResDtos = ConfigMsMapper.INSTANCE.toConfigDtoList(configEntities);
		
		return configResDtos;
	}

	public ConfigResDto findConfigById(String configKey) {
		Optional<ConfigEntity> configEntity = configRepository.findById(configKey);
		
		ConfigResDto configResDto = configEntity
				.map(ConfigMsMapper.INSTANCE::toConfigDto)
				.orElse(new ConfigResDto());

		return configResDto;
	}

	public void saveConfig(ConfigReqDto configReqDto) {
		ConfigEntity configEntity = ConfigMsMapper.INSTANCE.toConfigEntity(configReqDto);
		configRepository.save(configEntity);
	}

	public void updateConfig(ConfigReqDto configReqDto) {
		ConfigEntity configEntity = ConfigMsMapper.INSTANCE.toConfigEntity(configReqDto);
		configRepository.save(configEntity);
	}

	public void deleteConfig(String configKey) {
		Optional<ConfigEntity> optionalConfigEntity = configRepository.findById(configKey);
		optionalConfigEntity.orElseThrow(NullPointerException::new);
		
		configRepository.deleteById(configKey);
	}
	
}
