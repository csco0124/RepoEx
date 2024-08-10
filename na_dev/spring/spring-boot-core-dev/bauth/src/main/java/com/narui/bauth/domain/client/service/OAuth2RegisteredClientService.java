package com.narui.bauth.domain.client.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.client.dto.ClientDto;
import com.narui.bauth.domain.client.dto.RegisteredClientDto;
import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.client.mapstruct.ClientMsMapper;
import com.narui.bauth.domain.client.repository.ClientRepository;
import com.narui.bauth.domain.client.repository.RegisteredClientRepositoryImpl;
import com.narui.bauth.domain.clientSettingInfo.dto.ClientSettingInfoDto;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;
import com.narui.bauth.domain.clientSettingInfo.repository.ClientSettingInfoRepository;

@Service
public class OAuth2RegisteredClientService {

	private final RegisteredClientRepositoryImpl registeredClientRepository;
	private final ClientSettingInfoRepository clientSettingInfoRepository;
	private final ClientRepository clientRepository;

	public OAuth2RegisteredClientService(RegisteredClientRepositoryImpl registeredClientRepository
			,ClientSettingInfoRepository clientSettingInfoRepository
			,ClientRepository clientRepository
			) {
		this.registeredClientRepository = registeredClientRepository;
		this.clientSettingInfoRepository = clientSettingInfoRepository;
		this.clientRepository = clientRepository;
	}

	public void save(RegisteredClient registeredClient) {

		RegisteredClient client = findByClientId(registeredClient.getClientId());

		if (client != null) {
			registeredClient = RegisteredClient.from(registeredClient)
								.id(client.getId())
								.build();
		}

		registeredClientRepository.save(registeredClient);
	}

	public void registeredClientSettingSave(RegisteredClient registeredClient, ClientSettingInfoDto clientSettingInfo) {
		RegisteredClient client = findByClientId(registeredClient.getClientId());
		String registeredId = null;

		if (client != null) {
			registeredClient = RegisteredClient.from(registeredClient)
					.id(client.getId())
					.build();
			registeredId = client.getId();
		}
		
		if(!Objects.equals(registeredClient.getId(), null)) {
			registeredId = registeredClient.getId();
		}

		ClientEntity clientEntity = clientRepository.findById(registeredId).orElse(null);
		ClientSettingInfoEntity clientSettingInfoEntity = clientSettingInfoRepository.findByClientEntity(clientEntity).orElse(null);
		if(Objects.equals(clientSettingInfoEntity, null)) {//clientSettingInfo가 등록되어 있지 않을 때
			clientSettingInfoEntity = ClientSettingInfoEntity.builder()
					.baseUrl(clientSettingInfo.getBaseUrl())
					.homeUri(clientSettingInfo.getHomeUri())
					.build();
		}else {//clientSettingInfo가 이미 등록되어 있을 때
			clientSettingInfoEntity.updateBaseUrl(clientSettingInfo.getBaseUrl());
			clientSettingInfoEntity.updateHomeUri(clientSettingInfo.getHomeUri());
		}

		registeredClientRepository.save(registeredClient, clientSettingInfoEntity);
	}

	public RegisteredClient findByClientId(String clientId) {
		return registeredClientRepository.findByClientId(clientId);
	}

	public Page<RegisteredClientDto.SearchRes> findAllSearch(Specification<ClientEntity> spec, Pageable pageable) throws Exception {
		Page<ClientEntity> clientList = clientRepository.findAll(spec, pageable);

		Page<RegisteredClientDto.SearchRes> resDto = clientList.map(new Function<ClientEntity, RegisteredClientDto.SearchRes>() {
			@Override
			public RegisteredClientDto.SearchRes apply(ClientEntity t) {
				//Entity -> DTO
				 return ClientMsMapper.INSTANCE.clientEntityToRegisteredClientDto(t);
			}
		});
		return resDto;
	}

	public List<RegisteredClient> findByOwner(String ownerName) {
		return registeredClientRepository.findByOwner(ownerName);
	}

	public RegisteredClient findById(String registeredClientId) {
		return registeredClientRepository.findById(registeredClientId);
	}

    public void deleteById(String registeredClientId) {
		registeredClientRepository.deleteById(registeredClientId);
    }


    public Optional<ClientEntity> getClientEntityById(String id) {
    	Optional<ClientEntity> clientEntity = clientRepository.findById(id);
    	return clientEntity;
    }

    @Transactional
    public List<ClientDto.ClientName> findAllClinet() {
    	
    	Sort sort = Sort.by(Sort.Order.asc("clientName"));
    	
    	List<ClientEntity> entityData = clientRepository.findAll(sort);

      return ClientMsMapper.INSTANCE.toClientDtos(entityData);

    	/* List<ClientDto.ClientName> returnData = new ArrayList<ClientDto.ClientName>();

    	for(int i = 0; i < entityData.size(); i++) {

    		ClientEntity entityIndex =  entityData.get(i);

    		List<String> authority = new ArrayList<String>();

    		Set<ClientRoleEntity> rolesSet = entityIndex.getClientRoles();

    		Iterator<ClientRoleEntity> it = rolesSet.iterator();

    		while(it.hasNext()) {
    			ClientRoleEntity clientRoleEntity = it.next();
    			authority.add(clientRoleEntity.getAuthority());
    		}
    		ClientDto.ClientName dto = new ClientDto.ClientName(entityIndex.getId(),entityIndex.getClientName(),authority);
    		returnData.add(dto);
    	}
    	return returnData; */
    }}
