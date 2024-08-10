package com.narui.bauth.domain.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;
import com.narui.bauth.domain.admin.dto.SocialInfoDto;
import com.narui.bauth.domain.admin.service.AdminService;
import com.narui.bauth.domain.user.dto.UserDto;

import io.swagger.v3.oas.annotations.Operation;

@Controller
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	/*
	 * parameter: Pageable(int page, int size,Sort sort)
	 * return: List<AuthorityDto>
	 */
	@Operation(summary = "모든 유저 권한 정보 리스트")
	@GetMapping(value = "/private/api/admin/authority-list")
	@ResponseBody
	public ResponseEntity<ApiResponse<List<UserDto.userInfoWithAuthorities>>> getAuthorityList(Pageable pageable){
		List<UserDto.userInfoWithAuthorities> authorityList = adminService.getAuthorityList(pageable);
		return ApiResponse.toOkResponseEntity(authorityList);
	}

	//getAuthorityList에서 받아온 데이터에 변경된 데이터 추가 삭제하여 파라미터로 보내야됨
	@Operation(summary = "유저 권한 추가/삭제")
	@PostMapping(value = "/private/api/admin/authorization")
	@ResponseBody
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> authorization(@RequestBody(required = false) UserDto.userInfoWithAuthorities userInfo) {
		adminService.updateAuthority(userInfo);
		
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "소셜 로그인에 필요한 소셜 종류 및 소셜 정보 확인")
	@GetMapping(value = "/private/api/admin/social-info")
	@ResponseBody
	public ResponseEntity<ApiResponse<List<SocialInfoDto>>> getSocialInfo(){
		adminService.getSocialInfo();
		return ApiResponse.toOkResponseEntity(null);
	}
	
}
