package com.narui.bauth.domain.authority.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.authority.dto.AuthorityDto;
import com.narui.bauth.domain.authority.service.AuthorityService;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/admin/authority")
public class AuthorityController {

	private final AuthorityService authorityService;

	public AuthorityController(AuthorityService authorityService) {
		this.authorityService = authorityService;
	}
	
	@Operation(summary =  "user테이블 pk로 authority 삭제")
	@DeleteMapping("/user/{userId}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> userAuthorityDeleteByUserId (Long userId) {
		authorityService.deleteByUserId(userId);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary =  "authority userId로 삭제 후 리스트로 추가")
	@PostMapping("/user/list")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> userAuthoritysSaveAll(@RequestBody AuthorityDto.UserPageAuthorityDto dto) {
		authorityService.userManageAuthority(dto);
		return ApiResponse.toOkResponseEntity();
	}
	
}
