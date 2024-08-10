package com.narui.bauth.domain.clientRole.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.clientRole.dto.ClientRoleDto;
import com.narui.bauth.domain.clientRole.service.ClientRoleService;
import com.narui.bauth.domain.clientRole.specification.ClientRoleSpecificationBuilder;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.common.api.ParamException;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/admin/client-role")
public class ClientRoleController {

	private final ClientRoleService clientRoleService;

	public ClientRoleController(ClientRoleService clientRoleService) {
		this.clientRoleService = clientRoleService;
	}
	
	@Operation(summary = "client role 등록")
	@PostMapping
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> saveClientRole(@RequestBody ClientRoleDto clientRoleDto) {
		clientRoleService.saveClientRole(clientRoleDto);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "전체 client role 검색")
	@PostMapping("/getClientRoleList")
	public ResponseEntity<ApiResponse<Page<ClientRoleDto.SearchRes>>> getClientRoleList(@Validated @RequestBody ClientRoleDto.Search req, Errors errors) {
		
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}	
		
		// 검색조건 세팅
		ClientRoleSpecificationBuilder specificationBuilder = new ClientRoleSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}

		Page<ClientRoleDto.SearchRes> res = clientRoleService.getClientRoleList(specificationBuilder.build(), req.getPageable());
		return ApiResponse.toOkResponseEntity(res);
	}
	
	@Operation(summary = "권한명으로 client role 조회")
	@GetMapping("/{authority}")
	public ResponseEntity<ApiResponse<ClientRoleDto>> findClientRoleByAuthority(@PathVariable(value = "authority") String authority) {
		ClientRoleDto clientRoleDto = clientRoleService.findClientRoleByAuthority(authority);
		return ApiResponse.toOkResponseEntity(clientRoleDto);
	}
	
	@Operation(summary = "client_role_id로 client role 삭제")
	@DeleteMapping("/{authority}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteClientRole(@PathVariable(value = "authority") String authority) {
		clientRoleService.deleteClientRole(authority);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "client_id로 client role list 조회")
	@GetMapping("/client/{clientId}")
	public ResponseEntity<ApiResponse<List<ClientRoleDto>>> findClientRoleListByClientId(@PathVariable(value = "clientId") String clientId) {
		List<ClientRoleDto> clientRoleList = clientRoleService.findClientRoleListByClientId(clientId);
		return ApiResponse.toOkResponseEntity(clientRoleList);
	}
	
	@Operation(summary = "특정 client의 defaultYn 컬럼 값이 'Y'인 권한 조회")
	@GetMapping("/default/client/{clientId}")
	public ResponseEntity<ApiResponse<ClientRoleDto>> findByDefaultYnAndClientId(@PathVariable(value = "clientId") String clientId) {
		ClientRoleDto clientRoleDto = clientRoleService.findByDefaultYnAndClientId(clientId);
		return ApiResponse.toOkResponseEntity(clientRoleDto);
	}
	

	/**
	 * 룰은 추가, 삭제만
	@Operation(summary = "client role 전체수정")
	@PutMapping("/api/client-role")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> putClientRole(@RequestBody ClientRoleDto clientRoleDto) {
		clientRoleService.putClientRole(clientRoleDto);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "client role 부분수정")
	@PatchMapping("/api/client-role")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> patchClientRole(@RequestBody ClientRoleDto clientRoleDto) {
		clientRoleService.patchClientRole(clientRoleDto);
		return ApiResponse.toOkResponseEntity();
	}
	**/

//	@Operation(summary = "전체 client role list 조회")
//	@GetMapping
//	public ResponseEntity<ApiResponse<List<ClientRoleDto>>> findClientRoles() {
//		List<ClientRoleDto> clientRoleList = clientRoleService.findClientRoleList();
//		return ApiResponse.toOkResponseEntity(clientRoleList);
//	}
	
}
