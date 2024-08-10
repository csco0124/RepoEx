package com.narui.bauth.domain.authority.mapstruct;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.authority.dto.AuthorityDto;
import com.narui.bauth.domain.authority.entity.AuthorityEntity;

@Mapper(componentModel = "spring")
public interface AuthorityMsMapper {

	AuthorityMsMapper INSTANCE = Mappers.getMapper(AuthorityMsMapper.class);
	
	
	@Named("toDto")
	@Mapping(target = "userId", source = "user.id")
	@Mapping(target = "authority_code", source = "authority")
    AuthorityDto toDto(AuthorityEntity authorityEntity);
	

    @Named("toEntity")
	@Mapping(target = "user.id", source = "userId")
	@Mapping(target = "authority", source = "authority_code")
	AuthorityEntity toEntity(AuthorityDto authorityDto);
    
    @IterableMapping(qualifiedByName = "toDto")
    List<AuthorityDto> toDtoList(List<AuthorityEntity> authorityEntityList);
    
    @IterableMapping(qualifiedByName = "toEntity")
    List<AuthorityEntity> toEntityList(List<AuthorityDto> authorityEntity);
}

