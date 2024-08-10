package com.narui.bauth.domain.clientAuthority.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.narui.bauth.domain.clientAuthority.dto.ClientAuthorityDto;
import com.narui.bauth.domain.clientAuthority.dto.ClientAuthorityDto.UserPageClientAuthorityDto;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.domain.clientAuthority.mapstruct.ClientAuthorityMapper;
import com.narui.bauth.domain.clientAuthority.repository.ClientAuthorityRepository;
import com.narui.bauth.domain.clientAuthority.specification.ClientAuthoritySpecificationBuilder;

import jakarta.transaction.Transactional;

@Service
public class ClientAuthorityService {

	private final ClientAuthorityRepository clientAuthorityRepository;
	
	public ClientAuthorityService(ClientAuthorityRepository clientAuthorityRepository
			) {
		this.clientAuthorityRepository = clientAuthorityRepository;
	}
	
	public List<ClientAuthorityDto> findClientAuthority() {
		List<ClientAuthorityEntity> clientAuthorityList = clientAuthorityRepository.findAll();
		return ClientAuthorityMapper.INSTANCE.toDtoList(clientAuthorityList);
	}
	
	public Page<ClientAuthorityDto> findClientAuthorityWithPageCriteria(ClientAuthorityDto.search clientAuthoritySearchDto) {
		ClientAuthoritySpecificationBuilder clientAuthoritySpecificationBuilder = new ClientAuthoritySpecificationBuilder(clientAuthoritySearchDto.getSearchCriteriaList());
		Page<ClientAuthorityEntity> clientAuthorityEntityList = clientAuthorityRepository.findAll(clientAuthoritySpecificationBuilder.build(), clientAuthoritySearchDto.getPageable());
		Page<ClientAuthorityDto> clientAuthorityDtoList = clientAuthorityEntityList.map(new Function<ClientAuthorityEntity, ClientAuthorityDto>() {
			@Override
			public ClientAuthorityDto apply(ClientAuthorityEntity clientAuthorityEntity) {
				return ClientAuthorityMapper.INSTANCE.toDto(clientAuthorityEntity);
			}
		});
		return clientAuthorityDtoList;
	}

	public ClientAuthorityDto findClientAuthorityById(Long id) {
		Optional<ClientAuthorityEntity> OptionalclientAuthorityEntity = clientAuthorityRepository.findById(id);
		ClientAuthorityDto clientAuthorityDto = OptionalclientAuthorityEntity
	    		.map(ClientAuthorityMapper.INSTANCE::toDto)
	            .orElse(new ClientAuthorityDto());
	     return clientAuthorityDto;
	}

	public List<ClientAuthorityDto> findClientAuthorityByUserId(Long userId) {
		List<ClientAuthorityEntity> clientAuthorityList = clientAuthorityRepository.findByUserEntity_Id(userId);
		return ClientAuthorityMapper.INSTANCE.toDtoList(clientAuthorityList);
	}

	public void saveClientAuthority(ClientAuthorityDto clientAuthorityDto) {
		ClientAuthorityEntity clientAuthorityEntity = ClientAuthorityMapper.INSTANCE.toEntity(clientAuthorityDto);
		clientAuthorityRepository.save(clientAuthorityEntity);
	}

	public void deleteClientAuthority(Long id) {
		clientAuthorityRepository.deleteById(id);
	}
	
	@Transactional
	public void deleteClientAuthorityByUserId(Long userId) {
		clientAuthorityRepository.deleteByUserEntity_Id(userId);
	}
	
	@Transactional
	public void saveAllClientAuthority(List<ClientAuthorityDto> dtoList) {
		List<ClientAuthorityEntity> entitiyList = ClientAuthorityMapper.INSTANCE.toEntityList(dtoList);
		clientAuthorityRepository.saveAll(entitiyList);
	}
	
	@Transactional
	public UserPageClientAuthorityDto deleteAndSaveAllClientAuthority(UserPageClientAuthorityDto dto) {
		
		clientAuthorityRepository.deleteByUserEntity_Id(dto.getUserId());
		List<ClientAuthorityEntity> entitiyList = new ArrayList<ClientAuthorityEntity>();
		
		if(dto.getAuthority() != null) {
			for(int i = 0; i < dto.getAuthority().size(); i++) {
				ClientAuthorityDto clientAuthorityDto = ClientAuthorityDto.builder()
						.userId(dto.getUserId())
						.authority(dto.getAuthority().get(i))
						.build();
				
				ClientAuthorityEntity entity = ClientAuthorityMapper.INSTANCE.toEntity(clientAuthorityDto);
				entitiyList.add(entity);
			}
			clientAuthorityRepository.saveAll(entitiyList);
		}
		
		return dto;
	}
	
}
