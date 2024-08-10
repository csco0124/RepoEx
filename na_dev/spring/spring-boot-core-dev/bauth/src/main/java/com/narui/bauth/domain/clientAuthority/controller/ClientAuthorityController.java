package com.narui.bauth.domain.clientAuthority.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.clientAuthority.dto.ClientAuthorityDto;
import com.narui.bauth.domain.clientAuthority.dto.ClientAuthorityDto.UserPageClientAuthorityDto;
import com.narui.bauth.domain.clientAuthority.service.ClientAuthorityService;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/admin/client-authority")
public class ClientAuthorityController {

	private final ClientAuthorityService clientAuthorityService;
	
	public ClientAuthorityController(ClientAuthorityService clientAuthorityService) {
		this.clientAuthorityService = clientAuthorityService;
	}
	
//	@Operation(summary = "전체 client authority list 조회")
//	@GetMapping
//	public ResponseEntity<ApiResponse<List<ClientAuthorityDto>>> findClientAuthority() {
//		List<ClientAuthorityDto> clientAuthorityList = clientAuthorityService.findClientAuthority();
//		return ApiResponse.toOkResponseEntity(clientAuthorityList);
//	}
	
	@Operation(summary = "전체 client authority list 조회")
	@GetMapping
	public ResponseEntity<ApiResponse<Page<ClientAuthorityDto>>> findClientAuthorityWithPageCriteria(
			@Validated @RequestBody ClientAuthorityDto.search clientAuthoritySearchDto) {
		Page<ClientAuthorityDto> clientAuthorityList = clientAuthorityService.findClientAuthorityWithPageCriteria(clientAuthoritySearchDto);
		return ApiResponse.toOkResponseEntity(clientAuthorityList);
	}
	
	@Operation(summary = "client-authority 테이블 pk로 client authority 조회")
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ClientAuthorityDto>> findClientAuthorityById(@PathVariable(value = "id") Long id) {
		ClientAuthorityDto clientAuthorityList = clientAuthorityService.findClientAuthorityById(id);
		return ApiResponse.toOkResponseEntity(clientAuthorityList);
	}
	
	@Operation(summary = "user테이블 pk로 client authority list 조회")
	@GetMapping("/user/{userId}")
	public ResponseEntity<ApiResponse<List<ClientAuthorityDto>>> findClientAuthorityByUserId(@PathVariable(value = "userId") Long userId) {
		List<ClientAuthorityDto> clientAuthorityList = clientAuthorityService.findClientAuthorityByUserId(userId);
		return ApiResponse.toOkResponseEntity(clientAuthorityList);
	}
	
	@Operation(summary = "client authority 등록")
	@PostMapping
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> saveClientAuthority(@RequestBody ClientAuthorityDto clientAuthorityDto) {
		clientAuthorityService.saveClientAuthority(clientAuthorityDto);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary =  "client-authority 테이블 id로 client authority 삭제")
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteClientAuthority(@PathVariable(value = "id") Long id) {
		clientAuthorityService.deleteClientAuthority(id);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary =  "user테이블 pk로 client authority 삭제")
	@DeleteMapping("/user/{userId}")
	public void deleteClientAuthorityByUserId(Long userId) {
		clientAuthorityService.deleteClientAuthorityByUserId(userId);
	}
	
	
	@Operation(summary =  "client-authority userId로 삭제 후 리스트로 추가")
	@PostMapping("/user/list")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> saveAllClientAuthority(@RequestBody UserPageClientAuthorityDto dto) {
		UserPageClientAuthorityDto userPageClientAuthorityDto = dto;
		clientAuthorityService.deleteAndSaveAllClientAuthority(userPageClientAuthorityDto);
		return ApiResponse.toOkResponseEntity();
	}
}
