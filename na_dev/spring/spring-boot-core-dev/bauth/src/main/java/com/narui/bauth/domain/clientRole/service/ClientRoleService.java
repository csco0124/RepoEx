package com.narui.bauth.domain.clientRole.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.narui.bauth.domain.clientRole.dto.ClientRoleDto;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.clientRole.mapstruct.ClientRoleMapper;
import com.narui.bauth.domain.clientRole.repository.ClientRoleRepository;
import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;

@Service
public class ClientRoleService {

	private final ClientRoleRepository clientRoleRepository;
	
	private static final String DefaultYnValueY = "Y"; 

	public ClientRoleService(ClientRoleRepository clientRoleRepository) {
		this.clientRoleRepository = clientRoleRepository;
	}
	
	public List<ClientRoleDto> findClientRoleList() {
		List<ClientRoleEntity> clientRoleEntities = clientRoleRepository.findAll();
		return ClientRoleMapper.INSTANCE.toDtoList(clientRoleEntities);
	}

	public ClientRoleDto findClientRoleByAuthority(String authority) {
		Optional<ClientRoleEntity> optionalClientRoleEntity = clientRoleRepository.findById(authority);
		ClientRoleDto clientRoleDto = optionalClientRoleEntity
				.map(ClientRoleMapper.INSTANCE::toDto)
				.orElse(new ClientRoleDto());
		return clientRoleDto;
	}

	public List<ClientRoleDto> findClientRoleListByClientId(String clientId) {
		List<ClientRoleEntity> clientRoleEntities = clientRoleRepository.findByclientEntity_Id(clientId);
		return ClientRoleMapper.INSTANCE.toDtoList(clientRoleEntities);
	}

	public void saveClientRole(ClientRoleDto clientRoleDto) {
		boolean duplicateCheck = clientRoleRepository.existsByAuthority(clientRoleDto.getAuthority());
		if(duplicateCheck) {
			throw new ApiException("duplicated clientRole name");
		}
		
		ClientRoleEntity clientRoleEntity = ClientRoleMapper.INSTANCE.toEntity(clientRoleDto);
		clientRoleRepository.save(clientRoleEntity);
	}

	/** 룰은 추가, 삭제만
	public void putClientRole(ClientRoleDto clientRoleDto) {
		// ClientRoleEntity clientRoleEntity = ClientRoleMapper.INSTANCE.toEntity(clientRoleDto);
		// TODO: 필요시 쿼리 만들기
	}
	
	public void patchClientRole(ClientRoleDto clientRoleDto) {
		// ClientRoleEntity clientRoleEntity = ClientRoleMapper.INSTANCE.toEntity(clientRoleDto);
		// TODO: 필요시 쿼리 만들기
	}
	**/
	
	public void deleteClientRole(String authority) {
		Optional<ClientRoleEntity> OptionalclientRoleEntity = clientRoleRepository.findById(authority);
		OptionalclientRoleEntity.orElseThrow(NullPointerException::new);
		
		clientRoleRepository.deleteById(authority);
	}
	
	public ClientRoleDto findByDefaultYnAndClientId(String clientId) {
		ClientRoleEntity clientRoleEntity = clientRoleRepository.findByDefaultYnAndClientEntity_ClientId(clientId, DefaultYnValueY);
		return ClientRoleMapper.INSTANCE.toDto(clientRoleEntity);
	}
	
	
	public Page<ClientRoleDto.SearchRes> getClientRoleList(Specification<ClientRoleEntity> spec, Pageable pageable) {
		Page<ClientRoleEntity> loginLogs = clientRoleRepository.findAll(spec, pageable);
		Page<ClientRoleDto.SearchRes> res = loginLogs.map(new Function<ClientRoleEntity, ClientRoleDto.SearchRes>() {
			@Override
			public ClientRoleDto.SearchRes apply(ClientRoleEntity clientRole) {
				return ClientRoleMapper.INSTANCE.toResultDto(clientRole);
			}
		});
		return res;
	}

}
