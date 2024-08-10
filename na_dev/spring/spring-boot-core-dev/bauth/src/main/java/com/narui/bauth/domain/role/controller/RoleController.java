package com.narui.bauth.domain.role.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.role.dto.RoleDto;
import com.narui.bauth.domain.role.service.RoleService;
import com.narui.bauth.domain.role.specification.RoleSpecificationBuilder;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/role")
public class RoleController {
	
	private final RoleService roleService;

	public RoleController (RoleService roleService) {
		this.roleService = roleService;
	}
	
	@Operation(summary =  "role 전체 조회(page)")
	@PostMapping("/list")
	public ResponseEntity<ApiResponse<Page<RoleDto>>> getRolesList (@Validated @RequestBody RoleDto.SearchRoleReq req) {
		RoleSpecificationBuilder specificationBuilder = new RoleSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}
		return ApiResponse.toOkResponseEntity(roleService.getRolesList(specificationBuilder.build(), req.getPageable()));
	}

	@Operation(summary =  "role 전체 조회")
	@GetMapping("/list")
	public ResponseEntity<ApiResponse<List<RoleDto>>> getRolesList () {
		List<RoleDto> res = roleService.getAllList();
		return ApiResponse.toOkResponseEntity(res);
	}

	@Operation(summary =  "role 등록")
	@PostMapping("/{authority}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> createRole (@PathVariable(value = "authority") String authority) {
		roleService.saveRole(authority);
		return ApiResponse.toOkResponseEntity();
	}

	@Operation(summary = "role authority명으로 role 삭제")
	@DeleteMapping("/{authority}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteRole(@PathVariable(value = "authority") String authority) {
		roleService.deleteRole(authority);
		return ApiResponse.toOkResponseEntity();
	}

	@Operation(summary = "role authority명으로 default 변경")
	@PutMapping("/setDefault/{authority}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> setDefaultRole(@PathVariable(value = "authority") String authority) {
		roleService.setDefaultRole(authority);
		return ApiResponse.toOkResponseEntity();
	}
}