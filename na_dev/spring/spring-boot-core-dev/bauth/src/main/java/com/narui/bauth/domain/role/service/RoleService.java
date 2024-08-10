package com.narui.bauth.domain.role.service;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.role.dto.RoleDto;
import com.narui.bauth.domain.role.entity.RoleEntity;
import com.narui.bauth.domain.role.mapstruct.RoleMsMapper;
import com.narui.bauth.domain.role.repository.RoleRepository;
import com.narui.common.api.ApiException;

@Service
@Transactional
public class RoleService {
	
	private final RoleRepository roleRepository;

	public RoleService (RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}
	
	public Page<RoleDto> getRolesList (Specification<RoleEntity> spec, Pageable pageable) {
		Page<RoleEntity> entityList = roleRepository.findAll(spec, pageable);
		Page<RoleDto> res = entityList.map(new Function<RoleEntity, RoleDto>() {
			@Override
			public RoleDto apply(RoleEntity entity) {
				return RoleMsMapper.INSTANCE.toDto(entity);
			}
		});
		return res;
	}

	public List<RoleDto> getAllList() {
		List<RoleEntity> entityList = roleRepository.findAll();
		List<RoleDto> res = RoleMsMapper.INSTANCE.toDtoList(entityList);
		return res;
	}

	public void saveRole(String authority) {
		if (roleRepository.existsByAuthority(authority)) {
			throw new ApiException("이미 등록된 권한입니다.");
		}

		RoleDto dto = RoleDto.builder()
						.authority(authority)
						.defaultYn(IsNullDefault() ? "Y" : "N")
						.build();

		RoleEntity entity = RoleMsMapper.INSTANCE.toEntity(dto);
		roleRepository.save(entity);
	}

	public void deleteRole(String authority) {
		RoleEntity entity = getRoleEntity(authority);

		if (isDefaultRole(entity)) {
			throw new ApiException("기본 권한은 삭제할 수 없습니다.");
		}

		roleRepository.deleteByAuthority(authority);
	}

	@Transactional(noRollbackFor={ApiException.class})
	public void setDefaultRole(String authority) {
		List<RoleEntity> defaultRoles = roleRepository.findAllByDefaultYn("Y");
		RoleEntity setEntity = getRoleEntity(authority);

		List<RoleEntity> otherDefaultRoles = defaultRoles.stream().filter(role -> !authority.equals(role.getAuthority())).toList();
		for (RoleEntity role : otherDefaultRoles) {
			role.setDefaultYn(false);
		}
		roleRepository.saveAll(otherDefaultRoles);

		if (isDefaultRole(setEntity)) {
			throw new ApiException("현재 기본 권한입니다.");
		}

		setEntity.setDefaultYn(true);
		roleRepository.save(setEntity);
	}

	private boolean isDefaultRole (RoleEntity entity) {
		return "Y".equals(entity.getDefaultYn());
	}

	private boolean IsNullDefault () {
		RoleEntity entity = roleRepository.findByDefaultYn("Y").orElse(null);
		return entity == null;
	}

	private RoleEntity getRoleEntity (String authority) {
		return roleRepository.findByAuthority(authority)
								.orElseThrow(() -> new ApiException("[" + authority + "] 권한이 존재하지 않습니다."));
	}
}