package com.narui.bauth.domain.clientRole.mapstruct;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.clientRole.dto.ClientRoleDto;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;

@Mapper(componentModel = "spring")
public interface ClientRoleMapper {

	ClientRoleMapper INSTANCE = Mappers.getMapper(ClientRoleMapper.class);
	
	@Named("toDto")
	@Mapping(target = "registeredClientId", source = "clientEntity.id")
	@Mapping(target = "clientName", source = "clientEntity.clientName")
	ClientRoleDto toDto(ClientRoleEntity clientRoleEntity);
	
	@Named("toResultDto")
	@Mapping(target = "oauth2RegisteredClientId", source = "clientEntity.id")
	@Mapping(target = "oauth2RegisteredClientClientId", source = "clientEntity.clientId")
	@Mapping(target = "clientName", source = "clientEntity.clientName")
	ClientRoleDto.SearchRes toResultDto(ClientRoleEntity clientRoleEntity);
	
	@Mapping(target = "clientEntity.id", source = "registeredClientId")
	@Mapping(target = "clientEntity.clientName", source = "clientName")
	ClientRoleEntity toEntity(ClientRoleDto clientRoleDto);
	
	@IterableMapping(qualifiedByName = "toDto")
	List<ClientRoleDto> toDtoList(List<ClientRoleEntity> clientRoleEntities);
	
}
