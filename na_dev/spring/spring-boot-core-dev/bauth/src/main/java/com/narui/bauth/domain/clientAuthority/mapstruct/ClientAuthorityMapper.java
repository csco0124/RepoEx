package com.narui.bauth.domain.clientAuthority.mapstruct;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.clientAuthority.dto.ClientAuthorityDto;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;

@Mapper(componentModel = "spring")
public interface ClientAuthorityMapper {

	ClientAuthorityMapper INSTANCE = Mappers.getMapper(ClientAuthorityMapper.class);
	
	@Named("toDto")
	@Mapping(target = "userId", source = "userEntity.id")
	@Mapping(target = "authority", source = "clientRoleEntity.authority")
	ClientAuthorityDto toDto(ClientAuthorityEntity clientAuthorityEntity);
	
	@Named("toEntity")
	@Mapping(target = "clientRoleEntity.authority", source = "authority")
	@Mapping(target = "userEntity.id", source = "userId")
	ClientAuthorityEntity toEntity(ClientAuthorityDto clientAuthorityDto);
	
	@IterableMapping(qualifiedByName = "toDto")
	List<ClientAuthorityDto> toDtoList(List<ClientAuthorityEntity> clientAuthorityEntities);
	
	@IterableMapping(qualifiedByName = "toEntity")
	List<ClientAuthorityEntity> toEntityList(List<ClientAuthorityDto> ClientAuthorityDto);
}
