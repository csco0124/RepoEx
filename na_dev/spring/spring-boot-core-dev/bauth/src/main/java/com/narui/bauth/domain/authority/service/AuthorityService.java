package com.narui.bauth.domain.authority.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.authority.dto.AuthorityDto;
import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.authority.mapstruct.AuthorityMsMapper;
import com.narui.bauth.domain.authority.repository.AuthorityRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class AuthorityService {
	
	private final AuthorityRepository authorityRepository;
	
	@Transactional
	public void deleteByUserId(Long userId) {
		authorityRepository.deleteByUserId(userId);
	}
	
	@Transactional
	public void saveAll(List<AuthorityDto> dtoList) {
		List<AuthorityEntity> entitiyList = AuthorityMsMapper.INSTANCE.toEntityList(dtoList);
		authorityRepository.saveAll(entitiyList);
	}
	
	@Transactional
	public void userManageAuthority(AuthorityDto.UserPageAuthorityDto dto) {
		authorityRepository.deleteByUserId(dto.getUserId());
		List<AuthorityEntity> entitiyList = new ArrayList<AuthorityEntity>();
		
		if(dto.getAuthority() != null) {
			for(int i = 0; i < dto.getAuthority().size(); i++) {
				AuthorityDto authorityDto = AuthorityDto.builder()
						.userId(dto.getUserId())
						.authority_code(dto.getAuthority().get(i))
						.build();
				
				AuthorityEntity entity = AuthorityMsMapper.INSTANCE.toEntity(authorityDto);
				entitiyList.add(entity);
			}
			authorityRepository.saveAll(entitiyList);
		}
	}

}
	