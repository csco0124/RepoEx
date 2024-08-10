package com.narui.bauth.domain.admin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.admin.dto.SocialInfoDto;
import com.narui.bauth.domain.authority.dto.AuthorityDto;
import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.socialAuth.entity.SocialInfoEntity;
import com.narui.bauth.domain.socialAuth.repository.SocialInfoRepository;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SocialInfoRepository socialInfoRepository;
	
	@Transactional
	public List<UserDto.userInfoWithAuthorities> getAuthorityList(Pageable pageable){
		Page<UserEntity> userEntityList = userRepository.findAll(pageable);
		List<UserDto.userInfoWithAuthorities> userList = new ArrayList<>();
		
		log.debug("userentitylist:: {}", userEntityList);
		
		userEntityList.stream().forEach(userEntity -> {
			List<AuthorityDto> authorities = new ArrayList<>();
			userEntity.getAuthorities().stream().forEach(authority -> {
				AuthorityDto authorityDto = new AuthorityDto(authority);
				authorities.add(authorityDto);
			});
			
			UserDto.userInfoWithAuthorities userDto = UserDto.userInfoWithAuthorities.builder()
					.id(userEntity.getId())
					.email(userEntity.getEmail())
					.nickname(userEntity.getNickname())
					.authorities(authorities)
					.build();
			
			userList.add(userDto);
		});
		
		return userList;
	}
	
	@Transactional
	public void updateAuthority(UserDto.userInfoWithAuthorities userInfo) {
		UserEntity orgUser = userRepository.findWithAuthoritiesById(userInfo.getId()).orElse(null);
		Set<AuthorityEntity> authorities = authoritiesMapping(orgUser, userInfo);
		authorities.forEach(authorityEntity -> authorityEntity.updateUser(orgUser));
		
		orgUser.getAuthorities().clear();
		orgUser.getAuthorities().addAll(authorities);
		
		userRepository.save(orgUser);
	}
	
	@Transactional
	public Set<AuthorityEntity> authoritiesMapping(UserEntity orgUser, UserDto.userInfoWithAuthorities userInfo) {
		Set<AuthorityEntity> orgAuthorities = orgUser.getAuthorities();
		List<AuthorityDto> paramAuthorities = userInfo.getAuthorities();
		
		//삭제
		Set<AuthorityEntity> toBe = orgAuthorities.stream()
			.filter(org -> paramAuthorities.stream().anyMatch(param-> param.getAuthority_code().equals(org.getAuthority())))
			.collect(Collectors.toSet());
		
		//추가
		paramAuthorities.stream()
			.filter(param -> orgAuthorities.stream().noneMatch(org -> org.getAuthority().equals(param.getAuthority_code())))
			.map(addItem -> AuthorityEntity.builder().authority(addItem.getAuthority_code()).build())
			.forEach(toBe::add);
		
		return toBe;
	}
	
	@Transactional
	public List<SocialInfoDto> getSocialInfo() {
		List<SocialInfoEntity> socialInfoList = socialInfoRepository.findAll();
		
		List<SocialInfoDto> socialInfoDtoList = socialInfoList.stream().map(entity -> {
			SocialInfoDto dto = SocialInfoDto.toDto(entity);
			return dto;
		}).collect(Collectors.toList());
		
		return socialInfoDtoList;
	}
}
