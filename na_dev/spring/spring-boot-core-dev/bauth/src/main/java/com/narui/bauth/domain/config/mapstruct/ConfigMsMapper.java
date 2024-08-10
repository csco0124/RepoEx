package com.narui.bauth.domain.config.mapstruct;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.config.dto.ConfigDto;
import com.narui.bauth.domain.config.entity.ConfigEntity;

@Mapper(componentModel = "spring")
public interface ConfigMsMapper {

	ConfigMsMapper INSTANCE = Mappers.getMapper(ConfigMsMapper.class);

	ConfigDto.ConfigResDto toConfigDto(ConfigEntity configEntity);
	
	List<ConfigDto.ConfigResDto> toConfigDtoList(List<ConfigEntity> configEntities);
	
	ConfigEntity toConfigEntity(ConfigDto.ConfigReqDto configReqDto);
	
}

