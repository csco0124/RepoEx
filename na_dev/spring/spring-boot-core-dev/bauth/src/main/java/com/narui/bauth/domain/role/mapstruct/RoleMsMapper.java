package com.narui.bauth.domain.role.mapstruct;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.role.dto.RoleDto;
import com.narui.bauth.domain.role.entity.RoleEntity;

@Mapper(componentModel = "spring")
public interface RoleMsMapper {

	RoleMsMapper INSTANCE = Mappers.getMapper(RoleMsMapper.class);
	
	@Named("toEntity")
	RoleEntity toEntity(RoleDto roleDto);
	
	@Named("toDto")
	RoleDto toDto(RoleEntity entity);	
	
	@IterableMapping(qualifiedByName = "toDto")
	List<RoleDto> toDtoList(List<RoleEntity> roleEntities);
	
	@IterableMapping(qualifiedByName = "toEntity")
	List<RoleEntity> toEntityList(List<RoleDto> roleDto);
}