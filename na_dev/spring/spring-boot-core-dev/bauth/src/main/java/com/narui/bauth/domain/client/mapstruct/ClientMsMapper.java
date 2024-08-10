package com.narui.bauth.domain.client.mapstruct;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.client.dto.ClientDto;
import com.narui.bauth.domain.client.dto.RegisteredClientDto;
import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;

@Mapper(componentModel = "spring")
public interface ClientMsMapper {

	ClientMsMapper INSTANCE = Mappers.getMapper(ClientMsMapper.class);

	@Named("getAuthority")
	static String getAuthority(ClientRoleEntity clientRole) {
		return clientRole.getAuthority();
	}

//	@Mapping(target="clientRoles", source="clientRoles", qualifiedByName = "getAuthority")
//	  RegisteredClientDto.SearchRes toDto(ClientEntity clientEntity);
	  List<RegisteredClientDto.SearchRes> toDtos(List<ClientEntity> clientEntity);

	@Mapping(target="authority", source="clientRoles", qualifiedByName = "getAuthority")
	ClientDto.ClientName toClientDto(ClientEntity client);
	List<ClientDto.ClientName> toClientDtos(List<ClientEntity> clients);

	@Mapping(target="baseUrl", source="clientSettingInfo.baseUrl")
	@Mapping(target="homeUri", source="clientSettingInfo.homeUri")
	RegisteredClientDto.SearchRes clientEntityToRegisteredClientDto(ClientEntity clientEntity);

}
